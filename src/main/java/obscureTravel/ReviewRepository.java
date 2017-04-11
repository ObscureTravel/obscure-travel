package obscureTravel;


import org.springframework.data.repository.CrudRepository;

public interface ReviewRepository extends CrudRepository<Review, Long>{

	Iterable<Review> findByLocationId(Long locationId);
	
	

}
