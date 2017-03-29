package obscureTravel;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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
}
