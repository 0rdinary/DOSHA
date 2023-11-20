package com.dgb.dosha.domain.inspection;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.dgb.dosha.domain.employee.Employee;
import com.dgb.dosha.domain.notification.NotiType;
import com.dgb.dosha.domain.notification.NotificationDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class InspectionDto {
	private Long id;
	private Long employeeId;
	private String employeeName;
	private Long managerId;
	private String filename;
	private String date;
	private boolean isChecked;
}
