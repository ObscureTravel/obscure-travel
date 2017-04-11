package obscureTravel;

import java.util.Set;

import org.springframework.data.repository.CrudRepository;

public interface LocationRepository extends CrudRepository<Location, Long> {

	//Iterable<Review> findByLocation(Long locationId);
	//Set<Location> findAll();

}
