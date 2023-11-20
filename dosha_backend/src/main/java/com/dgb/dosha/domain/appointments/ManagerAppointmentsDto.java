package com.dgb.dosha.domain.appointments;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class ManagerAppointmentsDto {
	private Long id;
	private String appointedDate;
}
