package com.dgb.dosha.domain.notification;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dgb.dosha.domain.employee.Employee;

@Repository
public interface NotificationRepository extends 
	JpaRepository<Notification, Long> {
	List<Notification> findByEmployeeAndIsChecked(
			Employee employee, 
			boolean isChecked);
	
	boolean existsByEmployeeAndNotiTypeAndIsChecked(
			Employee employee, 
			NotiType type, 
			boolean isChecked);
}
