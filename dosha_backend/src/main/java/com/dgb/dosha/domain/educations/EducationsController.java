package com.dgb.dosha.domain.educations;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dgb.dosha.domain.employee.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/manager/educations")
@RequiredArgsConstructor
public class EducationsController {
	
	private final EducationsService es;
	private final EducationsRepository er;
	private final EmployeeRepository employeeRepository;

	@PostMapping("/upload")
	public ResponseEntity<String> upload(
			@RequestParam Long id,
			@RequestParam MultipartFile educations) {
		
		es.upload(id, educations);
		
		return ResponseEntity.ok("true");
	}

	@GetMapping("/load")
	public byte[] loadEducations(@RequestParam Long id) throws IOException {
//		Path path = Paths.get(es.load(id));
        UrlResource resource = new UrlResource("file:" + es.load(id));
        byte[] bytes = StreamUtils.copyToByteArray(resource.getInputStream());
        return bytes;
	}
}