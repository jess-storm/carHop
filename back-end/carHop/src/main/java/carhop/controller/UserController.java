package carhop.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import carhop.exception.RecordNotFoundException;
import carhop.model.User;
import carhop.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/profile")
public class UserController {

	@Autowired
	UserService service;
	
	@GetMapping(path="/findAll", produces= "application/json")
	@PreAuthorize("permitAll()")
	public List<User> getAllUsers() {
		return service.getAllUsers();
	}
	
	@GetMapping(path ="/findUser/{id}", produces= "application/json")
	@PreAuthorize("permitAll()")
	public User findByUserId(@PathVariable("id") Long id) 
			throws RecordNotFoundException {
		return service.findUserById(id);
	}
	
	@GetMapping(path ="/{id}", produces= "application/json")
	@PreAuthorize("permitAll()")
	public User findById(@PathVariable("id") Long id) 
			throws RecordNotFoundException {
		return service.findUserById(id);
	}
	
	@PostMapping(path="/edit")
	@PreAuthorize("hasRole('DRIVER') or hasRole('RIDER') or hasRole('ADMIN')")
	public User updateUser(@PathVariable("id")
		@RequestBody User user ) throws RecordNotFoundException {
		
		return service.updateUser(user);
	}
	
	@DeleteMapping(path="/delete/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public void deleteUser(@PathVariable("id") Long id) throws RecordNotFoundException {
		service.deleteUser(id);
	}
}
