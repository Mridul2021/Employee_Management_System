package com.cagri.spring.jwt.mongodb.security.jwt;

import java.util.Date;
import com.cagri.spring.jwt.mongodb.security.services.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;

@Component
public class JwtUtils {

	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

	@Value("${bezkoder.app.jwtSecret}")
	private String jwtSecret;

	@Value("${bezkoder.app.jwtExpirationMs}")
	private int jwtExpirationMs;

	/**
	 * Generates a JWT token for the authenticated user.
	 *
	 * @param authentication The authentication object containing user details.
	 * @return The generated JWT token.
	 */
	public String generateJwtToken(Authentication authentication) {
		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
		return Jwts.builder()
				.setSubject(userPrincipal.getUsername()) // Subject is set as the username
				.setIssuedAt(new Date()) // Token issue date
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)) // Expiry date
				.signWith(SignatureAlgorithm.HS512, jwtSecret) // Signature using HS512
				.compact();
	}

	/**
	 * Extracts the username from the JWT token.
	 *
	 * @param token The JWT token.
	 * @return The username contained in the token.
	 */
	public String getUserNameFromJwtToken(String token) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
	}

	/**
	 * Validates the provided JWT token.
	 *
	 * @param authToken The JWT token.
	 * @return true if the token is valid, false otherwise.
	 */
	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		} catch (Exception e) {
			logger.error("Error validating JWT token: {}", e.getMessage());
		}

		return false;
	}

	/**
	 * Validates token and retrieves claims.
	 *
	 * @param token The JWT token.
	 * @return Claims object if the token is valid, or null if invalid.
	 */
	public Claims getClaimsFromToken(String token) {
		try {
			return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
		} catch (JwtException e) {
			logger.error("Error parsing claims from JWT: {}", e.getMessage());
			return null;
		}
	}
}
