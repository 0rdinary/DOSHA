package com.dgb.dosha.domain.notification;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dgb.dosha.domain.employee.Employee;
import com.dgb.dosha.domain.employee.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class NotificationService extends EgovAbstractServiceImpl {
	
	private final NotificationRepository nr;
	private final EmployeeRepository er;

	public NotificationDto send(NotificationDto dto) {
		nr.save(Notification.builder()
				.employee(er.findById(dto.getEmployeeId()).get())
				.notiType(dto.getNotiType())
				.isChecked(false)
				.build());
		
		return dto;
	}
	
	public List<NotificationDto> get(Long id) {
		Employee ep = er.findById(id).get();
		List<NotificationDto> list = 
				nr.findByEmployeeAndIsChecked(ep, false).stream()
				.map(Notification::toDto)
				.collect(Collectors.toList());
		return list;
	}
	
	public boolean existsByType(Long id, NotiType type) {
		Optional<Employee> ep = er.findById(id);
		
		if (nr.existsByEmployeeAndNotiTypeAndIsChecked(ep.get(), type, false)) {
			return true;
		}
		return false;
	}
	
	public void read(Long id) {
		log.info("시작");
		Notification notification = nr.findById(id).get();
		
		notification.setChecked(true);
		nr.save(notification);
	}
}
