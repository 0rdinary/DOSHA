package com.dgb.dosha.global.jwt;

import java.text.ParseException;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgb.dosha.domain.employee.dto.EmployeeDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	private final AuthService authService;

	@PostMapping("/signup")
	public ResponseEntity<EmployeeDto> signup(@RequestBody EmployeeDto employeeDto) {
	    return ResponseEntity.ok(authService.signup(employeeDto));
	}
	
	@PostMapping("/login")
	public ResponseEntity<TokenDto> login(@RequestBody EmployeeDto employeeDto) throws ParseException {
	    return ResponseEntity.ok(authService.login(employeeDto));
	}
	
	@PostMapping("/refresh")
	public ResponseEntity<TokenDto> refresh(@RequestHeader(value = "X-REFRESH-TOKEN") String bearerRefreshToken) throws AccessDeniedException {
		return ResponseEntity.ok(authService.refresh(bearerRefreshToken));
	}
	
	@PostMapping("/reset")
	public ResponseEntity<EmployeeDto> resetPassword(@RequestBody EmployeeDto employeeDto) {
		return ResponseEntity.ok(authService.resetPassword(employeeDto));
	}
}