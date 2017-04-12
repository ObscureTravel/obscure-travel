package obscureTravel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hamcrest.text.IsEmptyString;

@Entity
public class Review {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	private String content;
	private String userName;
	//private long location_Id;
	//private long thelocaitons;
	
	@ManyToOne
	//@JoinColumn(name = "LOCATION_ID")
	private Location location;
	
	
	protected Review() {
		
	}

	public Review(String content, String userName) {
		this.content = content;
		this.userName = userName;
		
		
	}
	
//	public void setLocation(Location location){
//		this.location = location;
//	}
	
	public Location getLocation() {
		return location;		
	}
	
	
	
	public Long getId() {
		return id;
	}

//	public void setId(Long id){
//		this.id = id;
//	}
//	
	public String getContent() {
		return content;
	}

	public String getUserName() {
		return userName;
	}


}
