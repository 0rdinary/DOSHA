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
@RequestMapping("/api/manager/appointments")
@RequiredArgsConstructor
@Slf4j
public class ManagerAppointmentsController {
	private final ManagerAppointmentsService mas;
	
	@GetMapping("/get")
	public ResponseEntity<ManagerAppointmentsDto> getManagerAppointmentsDto(@RequestParam Long id) {
		return ResponseEntity.ok(mas.getDto(id));
	}
	
	@PostMapping("/save")
	public ResponseEntity<String> save(@RequestBody ManagerAppointmentsDto dto) {
		return ResponseEntity.ok(mas.save(dto));
	}
}
