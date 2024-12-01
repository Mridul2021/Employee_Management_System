package com.cagri.spring.jwt.mongodb.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/test")
public class TestController {
	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}

	@GetMapping("/user")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/mod")
	public String moderatorAccess() {
		return "Moderator Board.";
	}

	@GetMapping("/admin")
	public String adminAccess() {
		return "Admin Board.";
	}
}
