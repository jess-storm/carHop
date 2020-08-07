package carhop.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
public class ScheduledTrips {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private int leavingZip;
	private int destinationZip;
	private Date date;
	private String route;
	private String message;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private User user;
	
	public ScheduledTrips() {}
	public ScheduledTrips(int leavingZip, int destinationZip, Date date, String route, String message) {
		this.leavingZip = leavingZip;
		this.destinationZip = destinationZip;
		this.date = date;
		this.route = route;
		this.message = message;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public int getLeavingZip() {
		return leavingZip;
	}


	public void setLeavingZip(int leavingZip) {
		this.leavingZip = leavingZip;
	}


	public int getDestinationZip() {
		return destinationZip;
	}


	public void setDestinationZip(int destinationZip) {
		this.destinationZip = destinationZip;
	}


	public Date getDate() {
		return date;
	}


	public void setDate(Date date) {
		this.date = date;
	}

	public String getRoute() {
		return route;
	}


	public void setRoute(String route) {
		this.route = route;
	}


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}

	@JsonProperty
	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}
	
}
