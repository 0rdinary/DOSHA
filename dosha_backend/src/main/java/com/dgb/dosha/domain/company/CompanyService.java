package com.dgb.dosha.domain.company;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dgb.dosha.domain.employee.Employee;
import com.dgb.dosha.domain.employee.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CompanyService extends EgovAbstractServiceImpl {
	private final CompanyRepository cr;
	private final EmployeeRepository er;
	private final String planFilePath = "/home/ubuntu/DOSHA/plan/";
	private final String evalFilePath = "/home/ubuntu/DOSHA/eval/";

	public String uploadFile(MultipartFile file, int tp) {
		String originFileName = file.getOriginalFilename();
		String newFileName = System.currentTimeMillis() + originFileName;
		
		File f;
		if (tp == 1) {
			f = new File(planFilePath + newFileName);
		} else {
			f = new File(evalFilePath + newFileName);
		}
		try {
			file.transferTo(f);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return newFileName;
	}
	
	public void regist(MultipartFile planFile, 
			MultipartFile evalFile, 
			CompanyDto dto) {
		
		String planFileName = this.uploadFile(planFile, 1);
		String evalFileName = this.uploadFile(evalFile, 2);
		
		cr.save(Company.builder()
				.name(dto.getName())
				.masterName(dto.getMasterName())
				.phoneNumber(dto.getPhoneNumber())
				.progress(dto.getProgress())
				.planFileName(planFileName)
				.evalFileName(evalFileName)
				.employee(er.findById(dto.getEmployeeId()).get())
				.build());
	}

	public void edit(MultipartFile planFile, 
			MultipartFile evalFile, 
			CompanyDto dto) {
		Company company = cr.findById(dto.getId()).get();
		
		company.setId(dto.getId());
		company.setName(dto.getName());
		company.setMasterName(dto.getMasterName());
		company.setProgress(dto.getProgress());
		company.setPhoneNumber(dto.getPhoneNumber());
		
		if (planFile != null && !planFile.isEmpty()) {
			company.setPlanFileName(uploadFile(planFile, 1));
			
		}
		if (evalFile != null && !evalFile.isEmpty()) {
			company.setEvalFileName(uploadFile(evalFile, 2));
		}
		
		cr.save(company);
	}
	
	public List<CompanyDto> get(Long id) {
		Employee employee = er.findById(id).get();
		
		List<CompanyDto> list = cr.findByEmployee(employee).stream()
								.map(m -> m.toDto())
								.collect(Collectors.toList());
		
		return list;
	}
	
	public void delete(Long id) {
		log.info(id.toString());
		cr.deleteById(id);
	}
}
