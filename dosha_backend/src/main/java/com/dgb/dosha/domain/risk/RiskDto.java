package com.dgb.dosha.domain.risk;

import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class RiskDto {
	private Long id;
	private String date;
	private String location;
	private Long employeeId;
	private String branchName;
	private String subbranchName;
	private String employeeName;
	private boolean checked;
}
