package com.dgb.dosha.domain.appointments;

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
@RequestMapping("/api/submanager/appointments")
@RequiredArgsConstructor
@Slf4j
public class SubmanagerAppointmentsController {
private final SubmanagerAppointmentsService sas;
	
	@GetMapping("/get")
	public ResponseEntity<SubmanagerAppointmentsDto> getSubmanagerAppointmentsDto(@RequestParam Long id) {
		return ResponseEntity.ok(sas.getDto(id));
	}
	
	@PostMapping("/save")
	public ResponseEntity<String> save(@RequestBody SubmanagerAppointmentsDto dto) {
		return ResponseEntity.ok(sas.save(dto));
	}
}
