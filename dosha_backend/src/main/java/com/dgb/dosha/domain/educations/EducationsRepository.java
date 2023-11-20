package com.dgb.dosha.domain.educations;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dgb.dosha.domain.employee.Employee;

public interface EducationsRepository extends
	JpaRepository<Educations, Long> {
	
	boolean existsByEmployee(Employee employee);
	Optional<Educations> findByEmployee(Employee employee);
}
