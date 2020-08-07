package carhop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import carhop.model.ScheduledTrips;

@Repository
public interface ScheduledTripsRepository extends JpaRepository<ScheduledTrips, Long> {

}
