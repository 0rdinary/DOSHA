package com.dgb.dosha.domain.proceedings;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dgb.dosha.domain.employee.Employee;

public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findByProceedingsAndEmployee(Proceedings proceedings, Employee employee);
	List<Member> findByEmployee(Employee employee);
}
