package com.dgb.dosha.domain.notification;

import com.dgb.dosha.domain.employee.Employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class NotificationDto {
	private Long id;
	private Long employeeId;
	private Long managerId;
	private NotiType notiType;
	private boolean isChecked;
	
//	public Notification toEntity() {
//		return Notification.builder()
//				.id(this.id)
//				.employee(this.employeeId)
//				.notiType(this.notiType)
//				.isChecked(this.isChecked)
//				.build();
//	}
}
