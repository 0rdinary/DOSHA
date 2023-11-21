package com.dgb.dosha.domain.inspection;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dgb.dosha.domain.educations.Educations;
import com.dgb.dosha.domain.employee.Employee;
import com.dgb.dosha.domain.employee.repository.EmployeeRepository;
import com.dgb.dosha.domain.notification.NotiType;
import com.dgb.dosha.domain.notification.Notification;
import com.dgb.dosha.domain.notification.NotificationRepository;
import com.dgb.dosha.domain.notification.NotificationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class InspectionService extends EgovAbstractServiceImpl {
	private final InspectionRepository ir;
	private final EmployeeRepository er;
	private final NotificationRepository nr;
	private final NotificationService ns;
	private final int DURATION = 30;
	private final String filePath = "./inspection/";
	
	public InspectionDto getLastOne(Long employeeId) throws ParseException {
		Employee employee = er.findById(employeeId).get();
		
		List<Inspection> list = ir.findByEmployeeOrderByDateDesc(employee);
		
		if (list.isEmpty() || this.overDuration(list.get(0).getDate())) {
			return null;
		}
		
		return list.get(0).toDto();
	}
	
	public String uploadFile(MultipartFile file) {
		String originFileName = file.getOriginalFilename();
		String newFileName = System.currentTimeMillis() + originFileName;
		
		File f = new File(filePath + newFileName);
		if (!f.exists()) {
			try {
				f.mkdirs();
			} catch (Exception e) {
				
			}
		}
		
		try {
			file.transferTo(f);
			f.setWritable(true);
			f.setReadable(true);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return newFileName;
	}
	
	public void regist(MultipartFile file, Long id) {
		String newFilePath = this.uploadFile(file);
		Employee employee = er.findById(id).get();
		
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String date = simpleDateFormat.format(new Date());
		
		Employee manager = employee.getBranch().getEmployee();
		
		// 저장
		ir.save(Inspection.builder()
				.employee(employee)
				.manager(manager)
				.filename(newFilePath)
				.date(date)
				.isChecked(false)
				.build());
		
		// 안전보건관리 책임자에게 알림 생성
		if (!ns.existsByType(manager.getId(), NotiType.INSPECTION_CHECKED)) {
			nr.save(Notification.builder()
					.employee(manager)
					.notiType(NotiType.INSPECTION_CHECKED)
					.isChecked(false)
					.build());
		}
	}
	
	public void check(Long id) {
		Inspection inspection = ir.findById(id).get();
		
		inspection.setChecked(true);
		
		ir.save(inspection);
	}
	
	public boolean overDuration(String day) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
//		
		Date fromDay = format.parse(day);
		Date toDay = format.parse(LocalDateTime.now().toString());
		
		long diff = toDay.getTime() - fromDay.getTime();
		long diffDays = diff / (24*60*60*1000);
		
		if (diffDays >= DURATION) {
			return true;
		} 
		return false;
	}

	public List<InspectionDto> getList(long id) {
		
		Employee manager = er.findById(id).get();
		
		return ir.findByManagerAndIsChecked(manager, false).stream()
					.map(Inspection::toDto)
					.collect(Collectors.toList());
	}

	public String loadImage(Long id) {
		
		return (filePath + ir.findById(id).get().getFilename());
	} 
}
