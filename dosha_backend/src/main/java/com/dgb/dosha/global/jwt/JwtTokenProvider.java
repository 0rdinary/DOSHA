package com.dgb.dosha.global.jwt;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import com.dgb.dosha.domain.employee.Employee;
import com.dgb.dosha.domain.employee.repository.EmployeeRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtTokenProvider {
	private final long ACCESS_EXPIRES_TIME = 1000 * 60 * 5;	// 5분
	private final long REFRESH_EXPIRES_TIME = 1000 * 60 * 60; // 1시간
	private final UserDetailsService userDetailsService;
	private final EmployeeRepository employeeRepository;
	private final Key key;
	
	public JwtTokenProvider(@Value("${jwt.secret}") String secretKey,
			UserDetailsService userDetailService,
			EmployeeRepository employeeRepository) {
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		this.key = Keys.hmacShaKeyFor(keyBytes);
		this.userDetailsService = userDetailService;
		this.employeeRepository = employeeRepository;
	}
	
	public TokenDto generateTokenDto(Authentication authentication) {
		String authorities = authentication.getAuthorities().stream()
								.map(GrantedAuthority::getAuthority)
								.collect(Collectors.joining(","));
		
		long now = (new Date()).getTime();
		
		Date tokenExpiresIn = new Date(now + ACCESS_EXPIRES_TIME);
		String accessToken = Jwts.builder()
								.setSubject(authentication.getName())
								.claim("role", authorities)
								.setExpiration(tokenExpiresIn)
								.signWith(key, SignatureAlgorithm.HS512)
								.compact();
		
		Date refreshTokenExpiresIn = new Date(now + REFRESH_EXPIRES_TIME);
		String refreshToken = Jwts.builder()
			.setExpiration(refreshTokenExpiresIn)
			.signWith(key, SignatureAlgorithm.HS512)
			.compact();
		
		Employee employee = employeeRepository.findById(Long.parseLong(authentication.getName())).get();
		String userName = employee.getName();
		String userPosition = employee.getPosition();
		
		return TokenDto.builder()
			.id(Long.parseLong(authentication.getName()))
			.name(userName)
			.position(userPosition)
			.grantType("Bearer")
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.build();
	}
	
	public Authentication getAuthentication(String accessToken) {
		Claims claims = parseClaims(accessToken);
		if (claims.get("role") == null) {
			throw new RuntimeException("권한이 없는 토큰");
		}
		
		Collection<? extends GrantedAuthority> authorities =
				Arrays.stream(claims.get("role").toString().split(","))
						.map(SimpleGrantedAuthority::new)
						.collect(Collectors.toList());
		UserDetails principal = new User(claims.getSubject(), "", authorities);
		
		return new UsernamePasswordAuthenticationToken(principal, "", authorities);
	}
	
	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다");
        }
		return false;
	}
	
	private Claims parseClaims(String accessToken) {
		try {
			return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
		} catch (ExpiredJwtException e) {
			return e.getClaims();
		}
	}
	
	public String getBearerTokenToString(String bearerToken) {
		if (bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring("Bearer ".length());
		}
		return null;
	}

	public Authentication getAuthenticationByUserId(Long id) {
		UserDetails userDetails = userDetailsService.loadUserByUsername(id.toString());
		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}
}
