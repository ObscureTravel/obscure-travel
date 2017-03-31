package obscureTravel.security;

import java.io.IOException;

import javax.annotation.Resource;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import com.fasterxml.jackson.databind.JsonNode;

@Component
@SessionScope
public class GoogleProfileRequest {

	@Resource
	private OAuth2ClientContext clientContext;

	@Resource
	private HttpUriRequest googleProfileRequest;

	@Resource
	private ResponseDeserializer deserializer;

	private static final String PROFILE_INFO_URI = "https://www.googleapis.com/plus/v1/people/me";

	private Logger log = LoggerFactory.getLogger(getClass());

	public JsonNode execute() {
		try {
			return performRequest();
		} catch (IOException ex) {
			throw new RuntimeException(ex);
		}
	}

	private JsonNode performRequest() throws IOException {
		try (CloseableHttpClient httpclient = HttpClients.createDefault()) {
			log.info("fetching user profile information from {}", PROFILE_INFO_URI);
			try (CloseableHttpResponse response = httpclient.execute(createRequest())) {
				return deserializer.deserialize(response);
			}
		}
	}

	public HttpUriRequest createRequest() {
		HttpGet request = new HttpGet(PROFILE_INFO_URI);
		request.addHeader("Authorization", "Bearer " + clientContext.getAccessToken());
		return request;
	}
}
