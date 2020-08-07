package carhop.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import carhop.model.ERole;
import carhop.model.Role;
import carhop.model.User;
import carhop.repository.RoleRepository;
import carhop.repository.UserRepository;
import carhop.request.LoginRequest;
import carhop.request.RegisterRequest;
import carhop.response.JwtResponse;
import carhop.response.MessageResponse;
import carhop.security.JwtUtils;
import carhop.service.UserDetailsImpl;




@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;
	

	@PostMapping("/login")
	@PreAuthorize("permitAll()")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(),
												 userDetails.getUsername(), 
												 userDetails.getEmail(),
												 userDetails.getFname(),
												 userDetails.getLname(), 
												 roles));
	}

	@PostMapping("/register")
	@PreAuthorize("permitAll()")
	public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
		if (userRepository.existsByUsername(registerRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(registerRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(registerRequest.getUsername(),
							 registerRequest.getEmail(),
							 registerRequest.getFname(),
							 registerRequest.getLname(),
							 encoder.encode(registerRequest.getPassword()));

		Set<String> strRoles = registerRequest.getRole();
		Set<Role> roles = new HashSet<>();


		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_RIDER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role driverRole = roleRepository.findByName(ERole.ROLE_DRIVER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(driverRole);

					break;
				default:
					Role riderRole = roleRepository.findByName(ERole.ROLE_RIDER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(riderRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
}