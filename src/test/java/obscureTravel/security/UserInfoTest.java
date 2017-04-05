package obscureTravel.security;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

import java.io.IOException;
import java.io.InputStream;

import org.junit.Before;
import org.junit.Test;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class UserInfoTest {

	private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
	
	private UserInfo underTest;

	private JsonNode profileResponse;
	
	@Before
	public void setup() {
		try(InputStream profileJsonIn = createTestJsonStream()) {
			profileResponse = OBJECT_MAPPER.readValue(profileJsonIn, JsonNode.class);
		} catch (IOException ex) {
			throw new RuntimeException(ex);
		}
		
		underTest = new UserInfo(profileResponse);
	}

	private InputStream createTestJsonStream() {
		return getClass().getClassLoader().getResourceAsStream("test-google-profile-response.json");
	}

	@Test
	public void shouldFindName() {
		assertThat(underTest.getName(), is("Viator Obscura"));
	}
	
	@Test
	public void shouldFindEmail() {
		assertThat(underTest.getEmail(), is("obscure.travel.test@gmail.com"));
	}
}
