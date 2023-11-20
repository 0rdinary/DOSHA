package com.dgb.dosha.domain.reason;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReasonDto {
	private Long id;
	private Long employeeId;
	private String content;
}
