package com.dgb.dosha.domain.company;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.dgb.dosha.domain.employee.Employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Company {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length=40)
	private String name;
	
	@Column(nullable = false, length=20)
	private String masterName;
	
	@Column(nullable = false, length=14)
	private String phoneNumber;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length=16)
	private Progress progress;
	
	@Column(nullable = false)
	private String planFileName;
	
	@Column(nullable = false)
	private String evalFileName;
	
	@OneToOne
	@JoinColumn(name="submanager_id")
	private Employee employee;
	
	public CompanyDto toDto() {
		return CompanyDto.builder()
				.id(this.id)
				.name(this.name)
				.masterName(this.masterName)
				.phoneNumber(this.phoneNumber)
				.progress(this.progress)
				.employeeId(employee.getId())
				.build();
	}
}
