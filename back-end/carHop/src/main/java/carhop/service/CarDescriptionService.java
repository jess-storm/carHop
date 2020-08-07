package carhop.service;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import carhop.exception.RecordNotFoundException;
import carhop.model.CarDescription;
import carhop.repository.CarDescriptionRepository;
import carhop.repository.UserRepository;

@Service
public class CarDescriptionService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	CarDescriptionRepository repository;
	
	public List<CarDescription> getAllCars() {
		return (List<CarDescription>) repository.findAll();
		
	}
	
	public CarDescription findCarById(Long id) throws RecordNotFoundException{
		Optional<CarDescription> cd = repository.findById(id);
        if(cd.isPresent()) {
        	return cd.get();
        } else {
            throw new RecordNotFoundException("No car record exists for given id");
        }
	}
	
	public CarDescription createCarDescription(Long user_id,@Valid @RequestBody CarDescription car) throws RecordNotFoundException {
		return userRepository.findById(user_id).map(id -> {
			car.setUser(id);
			return repository.save(car);
		}).orElseThrow(() -> new RecordNotFoundException("User id " + user_id + " not found"));
	}
	
	public ResponseEntity<CarDescription> updateCarDescription(Long id, CarDescription car) throws RecordNotFoundException {
		Optional<CarDescription> carData = repository.findById(id);
		if(carData.isPresent()) {
			CarDescription car1 = carData.get();
			car1.setColor(car.getColor());
			car1.setLicensePlate(car.getLicensePlate());
			car1.setMake(car.getMake());
			car1.setModel(car.getModel());
			car1.setYear(car.getYear());
			
			return new ResponseEntity<>(repository.save(car1), HttpStatus.OK);
		} else {
			throw new RecordNotFoundException("Id " + id + " not found");
		}
	}
	
	public void deleteCar(Long id) throws RecordNotFoundException{
		Optional<CarDescription> cd = repository.findById(id);
        if(cd.isPresent()) {
        	repository.deleteById(id);
        } else {
            throw new RecordNotFoundException("No car record exists for given id");
        }
	}
}