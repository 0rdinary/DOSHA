package com.dgb.dosha.domain.appointments;

import java.util.Optional;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dgb.dosha.domain.employee.Employee;
import com.dgb.dosha.domain.employee.repository.EmployeeRepository;
import com.dgb.dosha.domain.notification.NotiType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ManagerAppointmentsService extends EgovAbstractServiceImpl {
	
	private final EmployeeRepository er;
	private final ManagerAppointmentsRepository mar;

	public ManagerAppointmentsDto getDto(Long id) {
		Optional<ManagerAppointments> ma = mar.findById(id);
		
		if (ma.isPresent()) {
			return ManagerAppointmentsDto.builder()
					.id(id)
					.appointedDate(ma.get().getAppointedDate())
					.build();
		} else {
			return ManagerAppointmentsDto.builder()
					.id(id)
					.appointedDate(null)
					.build();
		}
	}


	public String save(ManagerAppointmentsDto dto) {
		Employee em = er.findById(dto.getId()).get();
		ManagerAppointments ma = ManagerAppointments.builder()
				.employee(em)
				.appointedDate(dto.getAppointedDate())
				.build();
		mar.save(ma);
		
		return "Success";
	}
}
