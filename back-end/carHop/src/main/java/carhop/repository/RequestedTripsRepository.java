package carhop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import carhop.model.RequestedTrips;

@Repository
public interface RequestedTripsRepository extends JpaRepository<RequestedTrips, Long> {
	
}
