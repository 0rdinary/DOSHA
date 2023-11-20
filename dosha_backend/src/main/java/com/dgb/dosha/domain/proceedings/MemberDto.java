package com.dgb.dosha.domain.proceedings;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class MemberDto {
	private Long employeeId;
	private String name;
	private boolean checked;
}
