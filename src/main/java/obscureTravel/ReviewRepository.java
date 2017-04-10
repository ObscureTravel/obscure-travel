package obscureTravel;


import org.springframework.data.repository.CrudRepository;

public interface ReviewRepository extends CrudRepository<Review, Long>{
	
	Iterable<Review> findByLocation(Location location);

	Iterable<Review> findByLocationId(long locationId);

}
