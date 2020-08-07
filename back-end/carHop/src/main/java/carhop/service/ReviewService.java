package carhop.service;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import carhop.exception.RecordNotFoundException;
import carhop.model.Review;
import carhop.repository.ReviewRepository;
import carhop.repository.UserRepository;

@Service
public class ReviewService {
	
	@Autowired
	UserRepository userRepository;

	@Autowired
	ReviewRepository repository;

	public List<Review> getAllReview() {
		return (List<Review>) repository.findAll();
		
	}
	
	public Review findReviewById(Long id) throws RecordNotFoundException{
		Optional<Review> review = repository.findById(id);
        if(review.isPresent()) {
        	return review.get();
        } else {
            throw new RecordNotFoundException("No review record exists for given id");
        }
	}
	
	public List<Review> findReviewByUserId(Long id) {
		return (List<Review>) repository.findAllByUserId(id);
	}
	
	//create new review
	public Review createReview(Long user_id,@Valid @RequestBody Review review) throws RecordNotFoundException {
		return userRepository.findById(user_id).map(id -> {
			review.setUser(id);
			review.setDate(java.time.LocalDate.now());
			return repository.save(review);
		}).orElseThrow(() -> new RecordNotFoundException("User id " + user_id + " not found"));
	}
	   
	public Review updateReview(Review review) {
		return repository.save(review);
	}

	public void deleteReview(Long id) throws RecordNotFoundException{
		Optional<Review> review = repository.findById(id);
        if(review.isPresent()) {
        	repository.deleteById(id);
        } else {
            throw new RecordNotFoundException("No review record exists for given id");
        }
	}

}