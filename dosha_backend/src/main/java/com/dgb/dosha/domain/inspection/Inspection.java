package com.dgb.dosha.domain.inspection;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Inspection {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne
	@JoinColumn(name="employee_id", nullable = false)
	private Employee employee;
	
	@OneToOne
	@JoinColumn(name="manager_id")
	private Employee manager;
	
	@Column(nullable = false)
	private String filename;
	
	@Column(nullable = false, length=12)
	private String date;
	
	@Column(nullable = false)
	private boolean isChecked;
	
	public InspectionDto toDto() {
		return InspectionDto.builder()
				.id(this.id)
				.employeeId(employee.getId())
				.employeeName(employee.getName())
				.managerId(manager.getId())
				.filename(this.filename)
				.date(this.date)
				.isChecked(this.isChecked)
				.build();
	}
}
