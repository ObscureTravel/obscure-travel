package obscureTravel;


import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserController {

	@Resource
	private UserRepository myUserRepository;
	
	@RequestMapping("/users")
	public Iterable<User> displayAllUsers(){
		return myUserRepository.findAll();
		}
	
	@RequestMapping("/{id}")
	public User displayAllUsers(Long id){
		return myUserRepository.findOne(id);
		}
	
	
	
	
}
