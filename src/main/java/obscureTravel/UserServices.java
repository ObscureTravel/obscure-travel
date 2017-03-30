package obscureTravel;

import javax.annotation.Resource;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserServices {

	@Resource
	private UserRepository userRepository;

	public User currentUser() {
		Authentication authentication = securityContext().getAuthentication();
		String currentUserName = authentication.getName();
		return userRepository.findUsernameIgnoreCase(currentUserName);
	}

	private SecurityContext securityContext() {
		return SecurityContextHolder.getContext();
	}

}
