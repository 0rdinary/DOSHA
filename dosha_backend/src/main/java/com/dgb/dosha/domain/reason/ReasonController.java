package com.dgb.dosha.domain.reason;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reason")
@RequiredArgsConstructor
public class ReasonController {
	
	private final ReasonService rs;

	@PostMapping("/")
	public ResponseEntity<String> regist(@RequestBody ReasonDto dto) {
		
		rs.regist(dto);
		
		return ResponseEntity.ok("Success");
	}
}
