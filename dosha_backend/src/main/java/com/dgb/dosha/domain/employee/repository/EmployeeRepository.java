package com.dgb.dosha.domain.employee.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dgb.dosha.domain.branch.Branch;
import com.dgb.dosha.domain.employee.Employee;
import com.dgb.dosha.domain.employee.Role;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	Optional<Employee> findById(Long id);
	boolean existsById(Long id);
	List<Employee> findByRole(Role role);
	List<Employee> findByRoleAndBranch(Role role, Branch branch);
	Optional<Employee> findByIdAndRegistrationNumber(Long id, String registrationNumber);
}
