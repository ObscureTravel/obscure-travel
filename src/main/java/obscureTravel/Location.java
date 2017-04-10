package obscureTravel;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

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
	
	@OneToMany(mappedBy = "location", fetch = FetchType.EAGER)
	private Collection<Review> review;

	protected Location() {
	}

	public Location(String name, String latitude, String longitude, String locationType, String description) {
		this.name = name;
		this.latitude = latitude;
		this.longitude = longitude;
		this.locationType = locationType;
		this.description = description;
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

	public String getlocationType() {
		return locationType;
	}

	public String getDescription() {
		return description;
	}
	
}
