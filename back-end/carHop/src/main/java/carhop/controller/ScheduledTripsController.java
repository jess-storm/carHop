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
import carhop.model.ScheduledTrips;
import carhop.service.ScheduledTripsService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/outgoing_trips")
public class ScheduledTripsController {

	@Autowired
	private ScheduledTripsService service;

	
	@GetMapping(produces= "application/json")
	@PreAuthorize("permitAll()")
	public List<ScheduledTrips> getAllScheduledTrips() {
		return service.getAllScheduledTrips();
	}
	
	@GetMapping(path ="/{id}", produces= "application/json")
	@PreAuthorize("permitAll()")
	public ScheduledTrips findByScheduledTripId(@PathVariable("id") Long id) 
			throws RecordNotFoundException {
		return service.findScheduledTripById(id);
	}

	@PostMapping(path="/{user_id}/create")
	@PreAuthorize("hasRole('DRIVER') or hasRole('ADMIN')")
	public ScheduledTrips createScheduledTrip(@PathVariable (value = "user_id") Long id,
			@RequestBody ScheduledTrips st) throws RecordNotFoundException {
		
		return service.createScheduledTrip(id, st);
	}
	
	@PostMapping(path="/{id}/update") 
	@PreAuthorize("hasRole('DRIVER') or hasRole('ADMIN')")
	public ResponseEntity<ScheduledTrips> updateScheduledTrip(@PathVariable (value = "id") Long id,
			@RequestBody ScheduledTrips st) throws RecordNotFoundException{
		
		return service.updateScheduledTrip(id, st);
	}
	
	@DeleteMapping(path="/{id}")
	@PreAuthorize("hasRole('DRIVER') or hasRole('ADMIN')")
	public void deleteScheduledTrip(@PathVariable("id") Long id) throws RecordNotFoundException {
		service.deleteScheduledTrip(id);
	}

}