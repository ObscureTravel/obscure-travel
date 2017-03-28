package obscureTravel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Location {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	String name;
	String latitude;
	String longitude;
	String type;
	String description;

	protected Location() {
	}

	public Location(String name, String latitude, String longitude, String type, String description) {
		this.name = name;
		this.latitude = latitude;
		this.longitude = longitude;
		this.type = type;
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

	public String getType() {
		return type;
	}

	public String getDescription() {
		return description;
	}

}