package com.dgb.dosha.domain.meeting;

import java.net.MalformedURLException;
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
@RequestMapping("/api/meeting")
@RequiredArgsConstructor
public class MeetingController {
	
	private final MeetingService ms;

	@PostMapping("/regist")
	public ResponseEntity<String> regist(
			@RequestParam String name,
			@RequestParam MultipartFile meeting) {
		
		ms.regist(name, meeting);
		
		return ResponseEntity.ok("Success");
	}
	
	@GetMapping("/load")
	public ResponseEntity<UrlResource> loadEducations(@RequestParam Long id) throws MalformedURLException {
		
		return ResponseEntity.ok(new UrlResource("file:" + ms.load(id)));
	}
	
	@GetMapping("/get/all")
	public ResponseEntity<List<MeetingDto>> getAll() {
		return ResponseEntity.ok(ms.getAll());
	}
}
