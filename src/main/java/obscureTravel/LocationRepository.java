package obscureTravel;




import org.springframework.data.repository.CrudRepository;

public interface LocationRepository extends CrudRepository<Location, Long> {


	Iterable<Location> findByLocationType(String locationType);


}
