package com.dgb.dosha.domain.committee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dgb.dosha.domain.employee.Employee;

public interface CommitteeRepository extends JpaRepository<Committee, Long> {
	void deleteByEmployee(Employee employee);
	
	List<Committee> findByRole(CommitteeRole role);
}
