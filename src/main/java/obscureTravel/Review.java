package obscureTravel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Review {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	private String content;
	private String userName;
	
	@ManyToOne
	private Location location;
	
	protected Review() {
		
	}

	public Review(String content, String userName, Location location) {
		this.content = content;
		this.userName = userName;
		this.location = location;
	}

	public long getId() {
		return id;
	}

	public String getContent() {
		return content;
	}

	public String getUserName() {
		return userName;
	}
	
	public Location getLocation() {
		return location;
	}
	
	

}
