package obscureTravel;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

	User findUsernameIgnoreCase(String currentUserName);

}
