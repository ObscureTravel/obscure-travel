package obscureTravel;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface LocationRepository extends CrudRepository<Location, Long> {

//	List<Location> findAll();
//	List<Location> findByName(String name);
//	Location findOne(Long id);
}
