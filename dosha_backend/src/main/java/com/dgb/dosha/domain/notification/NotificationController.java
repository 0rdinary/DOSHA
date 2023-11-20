package com.dgb.dosha.domain.notification;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/notification")
@RequiredArgsConstructor
@Slf4j
public class NotificationController {
	
	private final NotificationService ns;
	
	@PostMapping("/send")
	public ResponseEntity<NotificationDto> sendNotification(
			@RequestBody NotificationDto dto) {
		return ResponseEntity.ok(ns.send(dto));
	}
	
	@GetMapping("/get")
	public ResponseEntity<List<NotificationDto>> getNotification(
			@RequestParam Long id) {
		return ResponseEntity.ok(ns.get(id));
//		return ResponseEntity.ok(null);
	}
	
	@PostMapping("/read")
	public ResponseEntity<String> readNotification(
			@RequestBody NotificationDto dto) {
		ns.read(dto.getId());
		return ResponseEntity.ok("Success");
	}
}
