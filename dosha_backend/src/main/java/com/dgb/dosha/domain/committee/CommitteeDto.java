package com.dgb.dosha.domain.committee;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
public class CommitteeDto {
	
	private Long employeeId;
	private String employeeName;
	private String employeePosition;
	private CommitteeRole role;
}
