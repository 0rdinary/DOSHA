package com.dgb.dosha.domain.proceedings;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/proceedings")
@RequiredArgsConstructor
public class ProceedingsController {
	
	private final ProceedingsService ps;
	
	@GetMapping("/get/all")
	public ResponseEntity<List<ProceedingsDto>> getAll() {
		
		return ResponseEntity.ok(ps.getAll());
	}
	
	@GetMapping("/get")
	public ResponseEntity<List<ProceedingsDto>> get(
			@RequestParam Long id) {
		
		return ResponseEntity.ok(ps.get(id));
	}
	
	@PostMapping("/regist")
	public ResponseEntity<String> registProceedings(
			@RequestBody ProceedingsDto dto) {
		
		ps.regist(dto);
		return null;
	}
	
	@PostMapping("/edit")
	public ResponseEntity<String> editProceedings(
			@RequestBody ProceedingsDto dto) {
		
		ps.edit(dto);
		return null;
	}
	
	@PostMapping("/check")
	public ResponseEntity<String> checkProceedings(
			@RequestParam Long proceedingsId, 
			@RequestParam Long memberId) {
		
		ps.check(proceedingsId, memberId);
		return null;
	}
}
