package com.dgb.dosha.domain.inspection;

import java.net.MalformedURLException;
import java.text.ParseException;
import java.util.List;

import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/inspection")
@RequiredArgsConstructor
public class InspectionController {

	private final InspectionService is;
	
	@GetMapping("/get")
	public ResponseEntity<InspectionDto> get(
			@RequestParam Long id) throws ParseException {
		
		InspectionDto dto = is.getLastOne(id);
		
		return ResponseEntity.ok(dto);
	}
	
	@PostMapping("/regist")
	public ResponseEntity<String> regist(
			@RequestParam Long id,
			@RequestParam MultipartFile inspection) {
		
		is.regist(inspection, id);
		
		return ResponseEntity.ok("success");
	}
	
	@GetMapping("/getlist")
	public ResponseEntity<List<InspectionDto>> getList(
			@RequestParam Long id) throws ParseException {
		
		return ResponseEntity.ok(is.getList(id));
	}
	
	@GetMapping("/get/image")
	public ResponseEntity<UrlResource> loadImage(@RequestParam Long id) throws MalformedURLException {
		
		return ResponseEntity.ok(new UrlResource("file:" + is.loadImage(id)));
	}
	
	@PostMapping("/check")
	public ResponseEntity<String> regist(
			@RequestParam Long id) {
		
		is.check(id);
		
		return ResponseEntity.ok("success");
	}
}
