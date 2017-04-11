package obscureTravel.security;

import com.fasterxml.jackson.databind.JsonNode;

public class UserInfo {

	private JsonNode profileInfo;
	
	public UserInfo(JsonNode profileInfo) {
		this.profileInfo = profileInfo;
	}
	
	public String getName() {
		return profileInfo.findPath("displayName").asText();
	}
	
	public String getEmail() {
		JsonNode emails = profileInfo.findPath("emails");
		return findAccountEmail(emails);
	}

	private String findAccountEmail(JsonNode emails) {
		for(JsonNode node: emails) {
			if(isEmailAccount(node)) {
				return node.findPath("value").asText();
			}
		}
		return "";
	}

	private boolean isEmailAccount(JsonNode node) {
		String emailType = node.findPath("type").asText();
		return emailType.equals("account");
	}
	
	@Override
	public String toString() {
		return "user info: " + profileInfo;
	}

	
}
