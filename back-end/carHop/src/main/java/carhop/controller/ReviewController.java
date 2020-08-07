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
import carhop.model.Review;
import carhop.service.ReviewService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/reviews")
public class ReviewController {

	@Autowired
	private ReviewService service;
	
	@GetMapping(produces= "application/json")
	@PreAuthorize("hasRole('ADMIN')")
	public List<Review> getAllReview() {
		return service.getAllReview();
	}
	
	@GetMapping(path = "/{user_id}/user", produces= "application/json")
	@PreAuthorize("permitAll()")
	public List<Review> getAllByUser(@PathVariable("user_id") Long id) {
		return service.findReviewByUserId(id);
	}

	@GetMapping(path ="/{id}", produces= "application/json")
	@PreAuthorize("permitAll()")
	public Review findByReviewId(@PathVariable("id") Long id) 
			throws RecordNotFoundException {
		return service.findReviewById(id);
	}
	
	@PostMapping(path="/{user_id}/create") 
	@PreAuthorize("permitAll()")
	public Review createReview(@PathVariable (value = "user_id") Long id,
			@RequestBody Review review) throws RecordNotFoundException {
		
		return service.createReview(id, review);
	}
	
	@PostMapping(path="/update/{id}")
	@PreAuthorize("permitAll()")
	public Review updateReview(@RequestBody Review review) {
		
		return service.updateReview(review);
	}
	
	@DeleteMapping(path="/delete/{id}") 
	@PreAuthorize("permitAll()")
	public void deleteReview(@PathVariable("id") Long id) throws RecordNotFoundException {
		service.deleteReview(id);
	}

}