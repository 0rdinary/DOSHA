package com.dgb.dosha.domain.committee;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/committee")
@RequiredArgsConstructor
public class CommitteeController {
	
	private final CommitteeService cs;
	
	@PostMapping("/register")
	public ResponseEntity<CommitteeDto> register(
			@RequestParam Long id,
			@RequestParam CommitteeRole role) {
		
		return ResponseEntity.ok(cs.save(id, role));
	}
	
	@GetMapping("/get")
	public ResponseEntity<List<CommitteeDto>> get(
			@RequestParam CommitteeRole role) {
		
		return ResponseEntity.ok(cs.getByRole(role));
	}
	
	@PostMapping("/delete")
	public ResponseEntity<String> delete(
			@RequestParam Long id) {
		cs.delete(id);
		return ResponseEntity.ok("Success");
	}
	
	@GetMapping("/isMember")
	public ResponseEntity<Boolean> isMember(@RequestParam Long id) {
		return ResponseEntity.ok(cs.isMember(id));
	}

}
