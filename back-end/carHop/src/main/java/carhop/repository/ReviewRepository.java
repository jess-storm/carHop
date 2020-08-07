package carhop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import carhop.model.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{
	
	@Query(value = "SELECT * FROM REVIEWS WHERE USER_ID = :userId", nativeQuery = true)
	List<Review> findAllByUserId(@Param("userId") Long id);

}
