package com.dgb.dosha.domain.reason;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dgb.dosha.domain.employee.Employee;
import com.dgb.dosha.domain.employee.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ReasonService extends EgovAbstractServiceImpl {

	private final ReasonRepository rr;
	private final EmployeeRepository er;
	
	public void regist(ReasonDto dto) {
		Employee employee = er.findById(dto.getEmployeeId()).get();
		
		rr.save(Reason.builder()
				.employee(employee)
				.content(dto.getContent())
				.build());
	}
}
