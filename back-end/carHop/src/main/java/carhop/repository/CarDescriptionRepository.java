package carhop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import carhop.model.CarDescription;

@Repository
public interface CarDescriptionRepository extends JpaRepository<CarDescription, Long> {
	
}
