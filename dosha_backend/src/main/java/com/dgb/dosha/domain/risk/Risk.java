package com.dgb.dosha.domain.risk;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
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
public class Risk {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String date;
	
	@Column(nullable = false)
	private String location;
	
	@Column(nullable = false)
	private boolean checked;
	
	@OneToOne
	@JoinColumn(name="submanager_id")
	private Employee employee;
	
	@OneToOne
	@JoinColumn(name="manager_id")
	private Employee manager;
	
	@OneToMany(mappedBy="risk", cascade = CascadeType.ALL)
	private List<Danger> danger;
	
	public RiskDto toDto() {
		return RiskDto.builder()
				.id(id)
				.date(date)
				.location(location)
				.employeeName(employee.getName())
				.branchName(employee.getBranch().getName())
				.subbranchName(employee.getSubbranch().getName())
				.checked(checked)
				.employeeId(employee.getId())
				.build();
	}
}
