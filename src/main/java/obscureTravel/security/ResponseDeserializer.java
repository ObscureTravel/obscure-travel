package obscureTravel.security;

import java.io.IOException;
import java.io.InputStream;

import javax.annotation.Resource;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class ResponseDeserializer {

	@Resource
	private ObjectMapper objectMapper;

	public JsonNode deserialize(HttpResponse response) throws IOException {
		HttpEntity entity = response.getEntity();
		try (InputStream in = entity.getContent()) {
			return objectMapper.readTree(in);
		}
	}
}
