package com.dgb.dosha.domain.notification;

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
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne
	@JoinColumn(name = "employee_id")
	private Employee employee;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false, name="notification_type", length=26)
	private NotiType notiType;
	
	@Column(nullable = false)
	private boolean isChecked;
	
	public NotificationDto toDto() {
		return NotificationDto.builder()
				.id(this.id)
				.employeeId(this.employee.getId())
				.notiType(this.notiType)
				.isChecked(this.isChecked)
				.build();
	}
}
