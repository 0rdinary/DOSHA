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
public class ProceedingsDto {
	private Long id;
	private String date;
	private String location;
	private String type;
	private boolean completed;
	private String contents;
	private String others;
	private String notes;
	private List<Long> memberIds;
	private List<MemberDto> memberDtos;
}
