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
	private Long id;
	private String content;
	private String userName;
	private double rating;
	
	
	@ManyToOne
	private Location location;
	
	
	protected Review() {
		
	}

	

	public Review(String content, String userName, double rating) {
		this.content = content;
		this.userName = userName;
		this.rating = rating;
	}



	public Long getId() {
		return id;
	}


	public String getContent() {
		return content;
	}


	public String getUserName() {
		return userName;
	}


	public double getRating() {
		return rating;
	}


	public Location getLocation() {
		return location;
	}

	


}
