package obscureTravel;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Location {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	String name;
	String latitude;
	String longitude;
	String locationType;
	String description;
	
	@JsonIgnore
	@OneToMany (mappedBy = "location", fetch = FetchType.EAGER)
	
	public Collection<Review> reviews;

	protected Location() {
	}

	public Location(String name, String latitude, String longitude, String locationType, String description,
			Collection<Review> reviews) {
		this.name = name;
		this.latitude = latitude;
		this.longitude = longitude;
		this.locationType = locationType;
		this.description = description;
		this.reviews = reviews;
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getLatitude() {
		return latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public String getLocationType() {
		return locationType;
	}

	public String getDescription() {
		return description;
	}

	public Collection<Review> getReviews() {
		return reviews;
	}

	
	
}
