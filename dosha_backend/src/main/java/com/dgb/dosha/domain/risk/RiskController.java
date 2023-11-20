package com.dgb.dosha.domain.risk;

import java.net.MalformedURLException;
import java.util.List;

import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/risk/")
@RequiredArgsConstructor
public class RiskController {
	
	private final RiskService rs;

	@PostMapping("/regist")
	public ResponseEntity<String> regist(
			@RequestPart(value="files", required=false) MultipartFile[] files,
			 DangerDtoList dangerDtoList,
			 @RequestPart(value="risk") RiskDto riskDto) {
		
		rs.regist(files, dangerDtoList, riskDto);
		
		return ResponseEntity.ok("Success");
	}
	
	@GetMapping("/get/list")
	public ResponseEntity<List<RiskDto>> getAll(Long id) {
		return ResponseEntity.ok(rs.getAll(id));
	}
	
	@GetMapping("/dangers")
	public ResponseEntity<List<DangerDto>> getDangers(
			@RequestParam Long id) {
		return ResponseEntity.ok(rs.getDangers(id));
	}
	
	@PostMapping("/check")
	public ResponseEntity<String> check(@RequestParam Long id) {
		
		rs.check(id);
		
		return ResponseEntity.ok("Success");
	}
	
	@GetMapping("/image")
	public ResponseEntity<UrlResource> loadImage(@RequestParam Long id) throws MalformedURLException {
		
		return ResponseEntity.ok(new UrlResource("file:" + rs.loadImage(id)));
	}
}
