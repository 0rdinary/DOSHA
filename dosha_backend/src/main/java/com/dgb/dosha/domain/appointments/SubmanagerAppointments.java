package com.dgb.dosha.domain.appointments;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@AllArgsConstructor @NoArgsConstructor
@Builder
public class SubmanagerAppointments {
	@Id
	private Long id;
	
	@OneToOne
	@MapsId
	@JoinColumn(name="submanager_id")
	private Employee employee;
	
	@Column(nullable = false, length=12)
	private String appointedDate;
}
