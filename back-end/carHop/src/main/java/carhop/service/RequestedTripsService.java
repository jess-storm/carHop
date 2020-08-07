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
import carhop.model.RequestedTrips;
import carhop.repository.RequestedTripsRepository;
import carhop.repository.UserRepository;

@Service
public class RequestedTripsService {
	
	@Autowired
	UserRepository userRepository;

	@Autowired
	RequestedTripsRepository repository;
	
	public List<RequestedTrips> getAllRequestedTrips() {
		return (List<RequestedTrips>) repository.findAll();
		
	}
	
	public RequestedTrips findRequestedTripById(Long id) throws RecordNotFoundException{
		Optional<RequestedTrips> rt = repository.findById(id);
        if(rt.isPresent()) {
        	return rt.get();
        } else {
            throw new RecordNotFoundException("No trip record exists for given id");
        }
	}
	//create new requested trip
	public RequestedTrips createRequestedTrip(Long user_id,@Valid @RequestBody RequestedTrips requestedTrips) throws RecordNotFoundException {
		return userRepository.findById(user_id).map(id -> {
			requestedTrips.setUser(id);
			return repository.save(requestedTrips);
		}).orElseThrow(() -> new RecordNotFoundException("User id " + user_id + " not found"));
	}
	
	public ResponseEntity<RequestedTrips> updateRequestedTrip(Long id, @RequestBody RequestedTrips rt) throws RecordNotFoundException {
		Optional<RequestedTrips> rtData = repository.findById(id);
		if(rtData.isPresent()) {
			RequestedTrips rt1 = rtData.get();
			rt1.setDestinationZip(rt.getDestinationZip());
			rt1.setLeavingZip(rt.getLeavingZip());
			rt1.setMessage(rt.getMessage());
			rt1.setDate(rt.getDate());
			return new ResponseEntity<>(repository.save(rt1), HttpStatus.OK);
		} else {
			throw new RecordNotFoundException("Id " + id + " not found");
		}
	}
	
	
	public void deleteRequestedTrip(Long id) throws RecordNotFoundException{
		Optional<RequestedTrips> rt = repository.findById(id);
        if(rt.isPresent()) {
        	repository.deleteById(id);
        } else {
            throw new RecordNotFoundException("No trip record exist for given id");
        }
	}
}