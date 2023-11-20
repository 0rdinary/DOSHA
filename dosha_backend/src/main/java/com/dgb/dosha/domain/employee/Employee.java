package com.dgb.dosha.domain.employee;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.dgb.dosha.domain.branch.Branch;
import com.dgb.dosha.domain.employee.dto.EmployeeDto;
import com.dgb.dosha.domain.employee.dto.SubmanagerDto;
import com.dgb.dosha.domain.subbranch.Subbranch;
import com.dgb.dosha.global.converter.EncryptConverter;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Employee {
	@Id
	private Long id;
	
	@Column(nullable = false)
	@Convert(converter = EncryptConverter.class)
	private String name;
	
	@Column(nullable = false)
	@Convert(converter = EncryptConverter.class)
	private String registrationNumber;
	
	@Column(nullable = false)
	@Convert(converter = EncryptConverter.class)
	private String phoneNumber;
	
	@Column(nullable = false)
	private String password;
	
	@Enumerated(EnumType.STRING)
	@Column(length=15)
	private Role role;
	
	@Column(nullable = false, length=30)
	private String position;
	
	@OneToOne
	@JoinColumn(name="branch_id")
	private Branch branch;
	
	@OneToOne
	@JoinColumn(name="subbranch_id")
	private Subbranch subbranch;

	public EmployeeDto toDto() {
		return EmployeeDto.builder()
				.id(this.id)
				.name(this.name)
				.registrationNumber(this.registrationNumber)
				.phoneNumber(this.phoneNumber)
				.password(password)
				.role(this.role)
				.branchCode(branch.getId())
				.branchName(branch.getName())
				.subbranchCode(subbranch.getId())
				.subbranchName(subbranch.getName())
				.build();
	}
	
	public SubmanagerDto toSubmanagerDto() {
		return SubmanagerDto.builder()
				.id(this.id)
				.name(this.name)
				.registrationNumber("******-*******")
				.phoneNumber("***-****-****")
				.branchName(branch.getName())
				.subbranchName(subbranch.getName())
				.position(this.position)
				.build();
	}
}
