package carhop.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(	name = "users", 
		uniqueConstraints = { 
			@UniqueConstraint(columnNames = "username"),
			@UniqueConstraint(columnNames = "email") 
		})
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 20)
	private String fname;
	
	@NotBlank
	@Size(max = 20)
	private String lname;
	
	@NotBlank
	@Size(max = 20)
	private String username;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	@NotBlank
	@Size(max = 120)
	private String password;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_roles", 
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
	
	
	@OneToOne(mappedBy="user")
	@JoinColumn(name = "car_id", referencedColumnName = "id")
	@JsonIgnore
	private CarDescription car;
	
	@OneToMany(cascade=CascadeType.PERSIST, mappedBy = "user")
	@JsonIgnore
	private List<Review> review = new ArrayList<>();
	
	@OneToMany(cascade=CascadeType.PERSIST, mappedBy = "user")
	@JsonIgnore
	private List<RequestedTrips> rt = new ArrayList<>();
	
	@OneToMany(cascade=CascadeType.PERSIST, mappedBy = "user")
	@JsonIgnore
	private List<ScheduledTrips> st = new ArrayList<>();

	public User() {
	}

	public User(String username, String email,String fname, String lname, String password) {
		this.username = username;
		this.email = email;
		this.fname = fname;
		this.lname = lname;
		this.password = password;
	}
	public User(Long id) {
		this.id = id;
	}
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	@JsonProperty("car")
	public CarDescription getCar() {
		return car;
	}

	public void setCar(CarDescription car) {
		this.car = car;
	}

	public List<Review> getReview() {
		return review;
	}

	public void setReview(List<Review> review) {
		this.review = review;
	}

	public List<RequestedTrips> getRt() {
		return rt;
	}

	public void setRt(List<RequestedTrips> rt) {
		this.rt = rt;
	}

	public List<ScheduledTrips> getSt() {
		return st;
	}

	public void setSt(List<ScheduledTrips> st) {
		this.st = st;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}
	
	
}