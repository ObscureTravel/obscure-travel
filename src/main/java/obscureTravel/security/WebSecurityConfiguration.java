package obscureTravel.security;

import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableOAuth2Sso
@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http //
				.csrf().disable() //
				.antMatcher("/**").authorizeRequests() //
				.antMatchers("/oauth2-permitAll.html").permitAll() //
				.antMatchers("/locations/**").permitAll() //
				.antMatchers("/reviews/**").permitAll() //
				.antMatchers("/index.html").permitAll() //

	


				.antMatchers("/h2-console/**").permitAll() //

				.anyRequest().authenticated();

		http.headers().frameOptions().disable();
	}

}
