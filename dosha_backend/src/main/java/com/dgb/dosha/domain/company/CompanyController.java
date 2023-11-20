package com.dgb.dosha.domain.company;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class CompanyController {
	
	private final CompanyService cs;
	
	@PostMapping("/regist")
	public ResponseEntity<String> regist(
			@RequestPart(value="plan") MultipartFile planFile,
			@RequestPart(value="eval") MultipartFile evalFile,
			@RequestPart(value="dto") CompanyDto dto) {
		
		cs.regist(planFile, evalFile, dto);
		
		return ResponseEntity.ok("Success");
	}
	
	@PostMapping("/edit")
	public ResponseEntity<String> edit(
			@RequestPart(value="plan", required = false) MultipartFile planFile,
			@RequestPart(value="eval", required = false) MultipartFile evalFile,
			@RequestPart(value="dto") CompanyDto dto) {
	
		cs.edit(planFile, evalFile, dto);
		
		return ResponseEntity.ok("Success");
	}
	
	@GetMapping("/get")
	public ResponseEntity<List<CompanyDto>> get(@RequestParam("id") Long id) {
		return ResponseEntity.ok(cs.get(id));
	}
	
	@PostMapping("/delete")
	public ResponseEntity<String> delete(@RequestParam Long id) {
		cs.delete(id);
		return ResponseEntity.ok("Success");
	}
}
