package com.dgb.dosha.domain.company;

import com.dgb.dosha.domain.employee.Employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompanyDto {
	private Long id;
	private String name;
	private String masterName;
	private String phoneNumber;
	private Progress progress;
	private Long employeeId;
}
