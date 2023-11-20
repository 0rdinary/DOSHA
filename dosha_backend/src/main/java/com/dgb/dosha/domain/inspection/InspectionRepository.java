package com.dgb.dosha.domain.inspection;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dgb.dosha.domain.employee.Employee;

public interface InspectionRepository extends JpaRepository<Inspection, Long> {
	List<Inspection> findByEmployeeOrderByDateDesc(Employee employee);
	List<Inspection> findByManagerAndIsChecked(Employee manager, boolean isChecked);
//	List<Inspection> findByEmployeeAndIsChecked(Employee employee, boolean isChecked);
}
