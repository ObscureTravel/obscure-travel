package obscureTravel;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/locations")
public class LocationController {

	@Resource
	LocationRepository locationRepository;
	private String LocationType;

	@RequestMapping("/showLocations")
	public Iterable<Location> showLocations() {
		
		return locationRepository.findAll();
	}
	  
	@RequestMapping("/showbytype/{LocationType}")
	public Iterable<Location> findByType(@PathVariable("LocationType")String LocationType) {
		
		return locationRepository.findByLocationType(LocationType);
	}

	@RequestMapping("/{id}")
	public Location showLocation(@PathVariable Long id) {
		
		return locationRepository.findOne(id);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> addLocation (@RequestBody Location location) {
		
		return new ResponseEntity<>(locationRepository.save(location), HttpStatus.CREATED );
	}
	
	
	@RequestMapping(value="/location/{id}", method = RequestMethod.PUT)
	public Location updateLocation(@RequestBody Location location) {
		
		return locationRepository.save(location);
	}
	
	
	
}