package com.dgb.dosha.domain.company;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dgb.dosha.domain.employee.Employee;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
	List<Company> findByEmployee(Employee employee);
}
