package com.dgb.dosha.domain.risk;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class DangerDto {
	private Long id;
	private String cur;
	private int frequency;
	private int intensity;
	private String fileName;
	private MultipartFile file;
	private Long riskId;
}
