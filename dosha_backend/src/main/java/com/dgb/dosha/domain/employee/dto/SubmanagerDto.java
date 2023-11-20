package com.dgb.dosha.domain.employee.dto;

import com.dgb.dosha.domain.employee.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubmanagerDto {
	private Long id;
	private String name;
	private String registrationNumber;
	private String phoneNumber;
	private String branchName;
	private String subbranchName;
	private String position;
}
