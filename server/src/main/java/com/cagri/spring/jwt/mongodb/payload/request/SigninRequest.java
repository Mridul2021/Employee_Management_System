package com.cagri.spring.jwt.mongodb.payload.request;

import javax.validation.constraints.NotBlank;

public class SigninRequest {

	@NotBlank
	private String username;

	@NotBlank
	private String password;

	// Getters and Setters
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
