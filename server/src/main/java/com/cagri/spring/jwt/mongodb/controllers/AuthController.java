package com.cagri.spring.jwt.mongodb.controllers;
import com.cagri.spring.jwt.mongodb.models.User;
import com.cagri.spring.jwt.mongodb.payload.request.SigninRequest;
import com.cagri.spring.jwt.mongodb.payload.request.SignupRequest;
import com.cagri.spring.jwt.mongodb.payload.response.JwtResponse;
import com.cagri.spring.jwt.mongodb.payload.response.MessageResponse;
import com.cagri.spring.jwt.mongodb.repository.UserRepository;
import com.cagri.spring.jwt.mongodb.security.jwt.JwtUtils;
import com.cagri.spring.jwt.mongodb.security.services.UserDetailsImpl;
import com.cagri.spring.jwt.mongodb.security.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import javax.validation.Valid;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	private EmailService emailService;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody SigninRequest signinRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(signinRequest.getUsername(), signinRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		User user = userRepository.findByUsername(userDetails.getUsername())
				.orElseThrow(() -> new RuntimeException("Error: User not found."));

		String role = user.getRole();

		return ResponseEntity.ok(new JwtResponse(jwt, user.getId(), user.getUsername(), user.getEmail(), role));
	}



	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}

		User user = new User(
				signUpRequest.getUsername(),
				signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()),
				signUpRequest.getRole()
		);
		if (signUpRequest.getIsActive() != null) {
			user.setIsActive(signUpRequest.getIsActive());
		}

		if (signUpRequest.getInformation() != null) {
			user.setInformation(signUpRequest.getInformation());
		}

		if (signUpRequest.getLeaves() != null) {
			user.setLeaves(signUpRequest.getLeaves());
		}

		userRepository.save(user);

		String subject = "Welcome to Our Service";
		String message = "Hello " + user.getUsername() + ",\n\n" +
				"Your account has been successfully created.\n" +
				"Your username: " + user.getUsername() + "\n" +
				"Your password: " + signUpRequest.getPassword() + "\n\n" +
				"Best regards,\n" +
				"The Team";

		emailService.sendEmail(user.getEmail(), subject, message);  // Send email

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	@PostMapping("/signout")
	public ResponseEntity<?> logoutUser() {
		SecurityContextHolder.clearContext();


		return ResponseEntity.ok(new MessageResponse("User logged out successfully!"));
	}
}