package obscureTravel.security;

import javax.annotation.Resource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.SessionScope;

import com.fasterxml.jackson.databind.JsonNode;

@Configuration
public class UserInfoConfiguration {

	@Resource
	private GoogleProfileRequest profileRequest;

	@Bean
	@SessionScope
	public UserInfo userInfo() {
		JsonNode profileJson = profileRequest.execute();
		return new UserInfo(profileJson);
	}
}
