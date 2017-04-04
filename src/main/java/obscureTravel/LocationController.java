package obscureTravel;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/locations")
public class LocationController {

	@Resource
	LocationRepository locationRepository;

	@RequestMapping("/showLocations")
	public Iterable<Location> showLocations() {
		
		return locationRepository.findAll();
	}

	@RequestMapping("/{id}")
	public Location showLocation(@PathVariable Long id) {
		
		return locationRepository.findOne(id);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> addLocation (@RequestBody Location location) {
		
		return new ResponseEntity<>(locationRepository.save(location), HttpStatus.CREATED );
	}
	
	
	@RequestMapping(value="/{id}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateLocation(long id, @RequestBody Location location) {
		locationRepository.save(location);
	}
}
