package obscureTravel.security;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserInfoController {

	@Resource
	UserInfo userInfo;
	
	@RequestMapping("/name")
	public String returnUserInfo(){
		
		return String.format("{ 'name': '%s' }", userInfo.getName());
	}
	
}
