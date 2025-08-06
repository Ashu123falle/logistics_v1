package com.cdac.acts.logistics_v1.utilities;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.cdac.acts.logistics_v1.service.impl.CustomUserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final String SECRET_KEY = "server_key_001_server_key_001_secure!";

	// Generate token with a single role stored in claims
	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();

		String role = userDetails.getAuthorities().stream().findFirst().map(auth -> auth.getAuthority())
				.orElse("ROLE_USER");

		claims.put("authorities", role);
		
		if (userDetails instanceof CustomUserDetails) {
		    claims.put("userId", ((CustomUserDetails) userDetails).getId());
		}

		return Jwts.builder().setClaims(claims).setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
				.signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
	}

//	public String generateToken(UserDetails userDetails) {
//	    Map<String, Object> claims = new HashMap<>();
//
//	    List<String> roles = userDetails.getAuthorities().stream()
//	        .map(auth -> auth.getAuthority())
//	        .toList(); // ✅ or use .collect(Collectors.toList())
//
//	    claims.put("authorities", roles);
//
//	    if (userDetails instanceof CustomUserDetails) {
//	        claims.put("userId", ((CustomUserDetails) userDetails).getId());
//	    }
//
//	    return Jwts.builder()
//	        .setClaims(claims)
//	        .setSubject(userDetails.getUsername())
//	        .setIssuedAt(new Date(System.currentTimeMillis()))
//	        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
//	        .signWith(getSignKey(), SignatureAlgorithm.HS256)
//	        .compact();
//	}

	
	// Validate token against username and expiration
	public boolean isTokenValid(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
	}

	// Extract username (subject) from token
	public String extractUsername(String token) {
		return extractAllClaims(token).getSubject();
	}

	// Extract single role (if needed)
	public String extractUserRole(String token) {
		return (String) extractAllClaims(token).get("role");
	}

	// Parse and extract all claims
	private Claims extractAllClaims(String token) {
		return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
	}

	// Check if token is expired
	private boolean isTokenExpired(String token) {
		return extractAllClaims(token).getExpiration().before(new Date());
	}

	// Generate signing key from secret
	private Key getSignKey() {
		byte[] keyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
		return Keys.hmacShaKeyFor(keyBytes);
	}
	public Long extractUserId(String token) {
	    Object id = extractAllClaims(token).get("userId");
	    return id != null ? Long.valueOf(id.toString()) : null;
	}

}
