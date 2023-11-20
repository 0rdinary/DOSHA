package com.dgb.dosha.domain.employee.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dgb.dosha.domain.employee.dto.EmployeeDto;
import com.dgb.dosha.domain.employee.dto.SubmanagerDto;
import com.dgb.dosha.domain.employee.service.EmployeeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {
	
	private final EmployeeService es;
	
	@GetMapping("/submanager/get")
	public ResponseEntity<List<SubmanagerDto>> getSubmanagers(@RequestParam Long id) {
		return ResponseEntity.ok(es.getSubmanagers(id));
	}
	
	@GetMapping("/get/all")
	public ResponseEntity<List<EmployeeDto>> getAll() {
		return ResponseEntity.ok(es.getAll());
	}
	
	@GetMapping("/myinfo")
	public ResponseEntity<EmployeeDto> getMyInfo(@RequestParam Long id) {
		return ResponseEntity.ok(es.getMyInfo(id));
	}
}
