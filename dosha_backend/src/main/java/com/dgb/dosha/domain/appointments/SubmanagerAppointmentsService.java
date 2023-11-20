package com.dgb.dosha.domain.appointments;

import java.util.Optional;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dgb.dosha.domain.employee.Employee;
import com.dgb.dosha.domain.employee.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class SubmanagerAppointmentsService extends EgovAbstractServiceImpl{
	private final EmployeeRepository er;
	private final SubmanagerAppointmentsRepository sar;

	public SubmanagerAppointmentsDto getDto(Long id) {
		Optional<SubmanagerAppointments> ma = sar.findById(id);
		
		if (ma.isPresent()) {
			return SubmanagerAppointmentsDto.builder()
					.id(id)
					.appointedDate(ma.get().getAppointedDate())
					.build();
		} else {
			return SubmanagerAppointmentsDto.builder()
					.id(id)
					.appointedDate(null)
					.build();
		}
	}


	public String save(SubmanagerAppointmentsDto dto) {
		Employee em = er.findById(dto.getId()).get();
		SubmanagerAppointments ma = SubmanagerAppointments.builder()
				.employee(em)
				.appointedDate(dto.getAppointedDate())
				.build();
		sar.save(ma);
		
		return "Success";
	}
}
