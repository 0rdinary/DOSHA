package com.dgb.dosha.domain.risk;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Danger {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String cur;
	
	@Column(nullable = false)
	private int frequency;
	
	@Column(nullable = false)
	private int intensity;
	
	private String fileName;
	
	@ManyToOne
	@JoinColumn(name="risk_id")
	private Risk risk;
	
	public DangerDto toDto() {
		return DangerDto.builder()
				.id(id)
				.cur(cur)
				.frequency(frequency)
				.intensity(intensity)
				.fileName(fileName)
				.build();
	}
}
