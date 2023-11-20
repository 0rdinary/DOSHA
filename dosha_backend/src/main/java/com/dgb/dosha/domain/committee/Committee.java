package com.dgb.dosha.domain.committee;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

import com.dgb.dosha.domain.employee.Employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Committee {
	@Id
	@Column(name="employee_id")
	private Long id;
	
	@OneToOne
	@MapsId
	@JoinColumn(name = "employee_id")
	private Employee employee;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false, name="committee_role", length=10)
	private CommitteeRole role;
	
	public CommitteeDto toDto() {
		return CommitteeDto.builder()
				.employeeId(employee.getId())
				.employeeName(employee.getName())
				.employeePosition(employee.getPosition())
				.role(this.role)
				.build();
	}
}
