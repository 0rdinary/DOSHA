package com.dgb.dosha.domain.employee.dto;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.dgb.dosha.domain.branch.Branch;
import com.dgb.dosha.domain.employee.Employee;
import com.dgb.dosha.domain.employee.Role;
import com.dgb.dosha.domain.subbranch.Subbranch;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeeDto {
	private Long id;
	private String name;
	private String registrationNumber;
	private String phoneNumber;
	private String password;
	private Role role;
	private String position;
	private Long branchCode;
	private String branchName;
	private Long subbranchCode;
	private String subbranchName;
	
//	public Employee toEmployee(PasswordEncoder passwordEncoder) {
//		return Employee.builder()
//				.id(id)
//				.name(name)
//				.registrationNumber(this.registrationNumber)
//				.phoneNumber(phoneNumber)
//				.password(passwordEncoder.encode(password))
//				.role(role)
//				.position(this.position)
//				.branch(this.branch)
//				.subbranch(subbranch)
//				.build();
//	}
	
	public static EmployeeDto of(Employee employee) {
		return EmployeeDto.builder()
				.id(employee.getId())
				.name(employee.getName())
				.registrationNumber(employee.getRegistrationNumber())
				.phoneNumber(employee.getPhoneNumber())
				.password(employee.getPassword())
				.role(employee.getRole())
				.branchCode(employee.getBranch().getId())
				.branchName(employee.getBranch().getName())
				.subbranchCode(employee.getSubbranch().getId())
				.subbranchName(employee.getSubbranch().getName())
				.build();
	}
	
	public UsernamePasswordAuthenticationToken toAuthenticationToken() {
		return new UsernamePasswordAuthenticationToken(id, password);
	}
}
