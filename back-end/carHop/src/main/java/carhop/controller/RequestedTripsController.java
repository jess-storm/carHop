package carhop.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import carhop.model.RequestedTrips;
import carhop.service.RequestedTripsService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/requested_trips")
public class RequestedTripsController {
	
	@Autowired
	private RequestedTripsService service;

	@GetMapping(produces= "application/json")
	@PreAuthorize("permitAll()")
	public List<RequestedTrips> getAllRequestedTrips() {
		return service.getAllRequestedTrips();
	}
	
	@GetMapping(path="/{id}", produces= "application/json")
	@PreAuthorize("permitAll()")
	public RequestedTrips findByRequestedTripId(@PathVariable("id") Long id) 
			throws RecordNotFoundException {
		return service.findRequestedTripById(id);
	}
	
	@PostMapping(path="/{user_id}/create")
	@PreAuthorize("permitAll()")
	public RequestedTrips createRequestedTrip(@PathVariable (value = "user_id") Long id,
				@RequestBody RequestedTrips rt) throws RecordNotFoundException {
		
		return service.createRequestedTrip(id, rt);
	}
	
	@PostMapping(path="/{id}/update")
	@PreAuthorize("permitAll()")
	public ResponseEntity<RequestedTrips> updateRequestedTrip(@PathVariable (value = "id") Long id,
			@RequestBody RequestedTrips rt) throws RecordNotFoundException {
		
		return service.updateRequestedTrip(id, rt);
	}
	
	@DeleteMapping(path="/{id}")
	@PreAuthorize("permitAll()")
	public void deleteRequestedTrip(@PathVariable("id") Long id) throws RecordNotFoundException {
		service.deleteRequestedTrip(id);
	}
	
}
