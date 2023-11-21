package com.dgb.dosha.domain.risk;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.dgb.dosha.domain.employee.Employee;
import com.dgb.dosha.domain.employee.repository.EmployeeRepository;
import com.dgb.dosha.domain.notification.NotiType;
import com.dgb.dosha.domain.notification.Notification;
import com.dgb.dosha.domain.notification.NotificationRepository;
import com.dgb.dosha.domain.notification.NotificationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RiskService extends EgovAbstractServiceImpl {

	private final RiskRepository rr;
	private final DangerRepository dr;
	private final EmployeeRepository er;
	private final NotificationRepository nr;
	private final NotificationService ns;
	private final String filePath = "/home/ubuntu/DOSHA/dangers";
	
	public String uploadFile(MultipartFile file) {
		String originFileName = file.getOriginalFilename();
		String newFileName = System.currentTimeMillis() + originFileName;
		
		File f = new File(filePath + newFileName);
		try {
			file.transferTo(f);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return newFileName;
	}
	
	public void regist(
			MultipartFile[] files,
			 DangerDtoList dangerDtoList,
			 RiskDto riskDto) {
		
		int fileIndex = 0;
		Employee employee = er.findById(riskDto.getEmployeeId()).get();
		Employee manager = employee.getBranch().getEmployee();
				 
		Risk risk = Risk.builder()
					.date(riskDto.getDate())
					.location(riskDto.getLocation())
					.employee(employee)
					.manager(manager)
					.checked(false)
					.build();
		
		List<Danger> dangers = new ArrayList<Danger>();
		List<DangerDto> dtos = dangerDtoList.getDangers();
		
		for (DangerDto dto: dtos) {
			Danger danger = Danger.builder()
					.cur(dto.getCur())
					.frequency(dto.getFrequency())
					.intensity(dto.getIntensity())
					.risk(risk)
					.build();
			if (dto.getFrequency() * dto.getIntensity() >= 4) {
				danger.setFileName(this.uploadFile(files[fileIndex++]));
			}
			dangers.add(danger);
		}
		
		risk.setDanger(dangers);
		rr.save(risk);
		
		// 안전보건관리책임자에게 알림 생성
		if (!ns.existsByType(manager.getId(), NotiType.RISK_CHECKED)) {
			nr.save(Notification.builder()
					.employee(manager)
					.notiType(NotiType.RISK_CHECKED)
					.isChecked(false)
					.build());
		}
	}
	
	public List<RiskDto> getAll(Long id) {
		
		Employee manager = er.findById(id).get();
		List<Risk> risks = rr.findByManagerAndChecked(manager, false);
		
		return risks.stream()
				.map(Risk::toDto)
				.collect(Collectors.toList());
	}
	
	public List<DangerDto> getDangers(Long id) {
		
		Risk risk = rr.findById(id).get();
		
		
		return dr.findByRisk(risk).stream()
				.map(Danger::toDto)
				.collect(Collectors.toList());
	}
	
	public void check(Long id) {
		Risk risk = rr.findById(id).get();
		risk.setChecked(true);
		
		rr.save(risk);
	}
	
	public String loadImage(Long id) {
		
		return (filePath + dr.findById(id).get().getFileName());
	} 
	
//	public List<UrlResource> loadImages(Long id) throws MalformedURLException {
//		
//		List<Danger> dangers = dr.findByRisk(rr.findById(id).get());
//		List<UrlResource> result = new ArrayList<UrlResource>();
//		
//		for (Danger danger : dangers) {
//			if (danger.getFileName() != null) {
//				result.add(new UrlResource("file:" + filePath + danger.getFileName()));
//			}
//		}
//		
//		return result;
//	}
}
