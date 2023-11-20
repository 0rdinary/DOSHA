package com.dgb.dosha.domain.committee;

import java.util.List;
import java.util.stream.Collectors;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dgb.dosha.domain.employee.Employee;
import com.dgb.dosha.domain.employee.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CommitteeService extends EgovAbstractServiceImpl {
	private final CommitteeRepository cr;
	private final EmployeeRepository er;
	
	public CommitteeDto save(Long id, CommitteeRole role) {
		Committee committee = Committee.builder()
				.employee(er.findById(id).get())
				.role(role)
				.build();
		
		cr.save(committee);
		
		return committee.toDto();
	};
	
	public List<CommitteeDto> getByRole(CommitteeRole role) {
		return cr.findByRole(role).stream()
				.map(Committee::toDto)
				.collect(Collectors.toList());
	}
	
	public void delete(Long id) {
		Employee employee = er.findById(id).get();
		cr.deleteByEmployee(employee);
	};
	
	public boolean isMember(Long id) {
		return cr.existsById(id);
	}
}
