package obscureTravel.security;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DemoUserInfoController {

	@Resource
	private UserInfo userInfo;

	@ResponseBody
	@RequestMapping("/printUserInfo")
	public String print() {

		String response = "";

		response += String.format("<p>%s</p>", userInfo);
		response += "<p>display name: " + userInfo.getName() + "</p>";
		response += "<p>email: " + userInfo.getEmail() + "</p>";

		return response;
	}
}
