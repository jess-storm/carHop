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
import carhop.model.CarDescription;
import carhop.service.CarDescriptionService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/car")
public class CarDescriptionController {

	@Autowired
	CarDescriptionService service;
	
	@GetMapping(path="/findAll", produces= "application/json")
	@PreAuthorize("hasRole('ADMIN')")
	public List<CarDescription> getAllCars() {
		return service.getAllCars();
	}
	
	@GetMapping(path ="/{id}", produces= "application/json")
	//@PreAuthorize("permitAll()")
	@PreAuthorize("hasRole('DRIVER') or hasRole('ADMIN')")
	public CarDescription findByCar(@PathVariable("id") Long id) throws RecordNotFoundException {
		return service.findCarById(id);
	}
	
	@PostMapping(path="/{user_id}/create")
	@PreAuthorize("hasRole('DRIVER') or hasRole('ADMIN')")
	public CarDescription createCarDescription(@PathVariable (value = "user_id") Long id,
			@RequestBody CarDescription car) throws RecordNotFoundException {
		
		return service.createCarDescription(id, car);
	}
	
	@PostMapping(path="/{id}/update")
	@PreAuthorize("hasRole('DRIVER') or hasRole('ADMIN')")
	public ResponseEntity<CarDescription> updateCarDescription(@PathVariable (value = "id") Long id,
		@RequestBody CarDescription car ) throws RecordNotFoundException {
		
		return service.updateCarDescription(id, car);
	}
	
	@DeleteMapping(path="/{id}")
	@PreAuthorize("hasRole('DRIVER') or hasRole('ADMIN')")
	public void deleteCar(@PathVariable("id") Long id) throws RecordNotFoundException {
		service.deleteCar(id);
	}
	
	
	
}
