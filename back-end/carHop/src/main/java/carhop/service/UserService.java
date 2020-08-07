package carhop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import carhop.exception.RecordNotFoundException;
import carhop.model.User;
import carhop.repository.UserRepository;


 
@Service
public class UserService {
     
    @Autowired
    UserRepository repository;
     
	public List<User> getAllUsers() {
		return (List<User>) repository.findAll();
		
	}
	
	public User createUser(User user) {
		return repository.save(user);
	}
	   
	public User updateUser(User user) throws RecordNotFoundException {
		
		return repository.save(user);
	}
     
	public void deleteUser(Long id) throws RecordNotFoundException{
		Optional<User> user = repository.findById(id);
        if(user.isPresent()) {
        	repository.deleteById(id);
        } else {
            throw new RecordNotFoundException("No user record exists for given id");
        }
	}
	
	public User findUserById(Long id) throws RecordNotFoundException
    {
		Optional<User> user = repository.findById(id);
         
        if(user.isPresent()) {
            return user.get();
        } else {
            throw new RecordNotFoundException("No user record exists for given id");
        }
    }
	
	public User findUserByUsername(String username) throws RecordNotFoundException
    {
		Optional<User> user = repository.findByUsername(username);
         
        if(user.isPresent()) {
            return user.get();
        } else {
            throw new RecordNotFoundException("No user record exists for given username");
        }
    }
}