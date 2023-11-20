package com.dgb.dosha.domain.risk;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dgb.dosha.domain.employee.Employee;

@Repository
public interface RiskRepository extends JpaRepository<Risk, Long> {
	List<Risk> findByManagerAndChecked(Employee employee, boolean checked);
}
