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
import carhop.model.ScheduledTrips;
import carhop.repository.ScheduledTripsRepository;
import carhop.repository.UserRepository;

@Service
public class ScheduledTripsService {
	
	@Autowired
	UserRepository userRepository;

	@Autowired
	ScheduledTripsRepository repository;
	
	public List<ScheduledTrips> getAllScheduledTrips() {
		return (List<ScheduledTrips>) repository.findAll();
		
	}
	
	public ScheduledTrips findScheduledTripById(Long id) throws RecordNotFoundException{
		Optional<ScheduledTrips> st = repository.findById(id);
        if(st.isPresent()) {
        	return st.get();
        } else {
            throw new RecordNotFoundException("No trip record exists for given id");
        }
	}
	
	public ScheduledTrips createScheduledTrip(Long user_id,@Valid @RequestBody ScheduledTrips st) throws RecordNotFoundException {
		return userRepository.findById(user_id).map(id -> {
			st.setUser(id);
			return repository.save(st);
		}).orElseThrow(() -> new RecordNotFoundException("User id " + user_id + " not found"));
	}
	   
	public ResponseEntity<ScheduledTrips> updateScheduledTrip(Long id, @RequestBody ScheduledTrips st) throws RecordNotFoundException {
		Optional<ScheduledTrips> stData = repository.findById(id);
		if(stData.isPresent()) {
			ScheduledTrips st1 = stData.get();
			st1.setDestinationZip(st.getDestinationZip());
			st1.setLeavingZip(st.getLeavingZip());
			st1.setMessage(st.getMessage());
			st1.setRoute(st.getRoute());
			st1.setDate(st.getDate());
			return new ResponseEntity<>(repository.save(st1), HttpStatus.OK);
		} else {
			throw new RecordNotFoundException("Id " + id + " not found");
		}
	}

	public void deleteScheduledTrip(Long id) throws RecordNotFoundException{
		Optional<ScheduledTrips> st = repository.findById(id);
        if(st.isPresent()) {
        	repository.deleteById(id);
        } else {
            throw new RecordNotFoundException("No trip record exists for given id");
        }
	}

}