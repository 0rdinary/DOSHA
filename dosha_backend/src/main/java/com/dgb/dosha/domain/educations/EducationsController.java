package com.dgb.dosha.domain.educations;

import java.net.MalformedURLException;

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
@RequestMapping("/api/manager/educations")
@RequiredArgsConstructor
public class EducationsController {
	
	private final EducationsService es;

	@PostMapping("/upload")
	public ResponseEntity<String> upload(
			@RequestParam Long id,
			@RequestParam MultipartFile educations) {
		
		es.upload(id, educations);
		
		return ResponseEntity.ok("true");
	}

	@GetMapping("/load")
	public ResponseEntity<UrlResource> loadEducations(@RequestParam Long id) throws MalformedURLException {
		
		return ResponseEntity.ok(new UrlResource("file:" + es.load(id)));
	}
}