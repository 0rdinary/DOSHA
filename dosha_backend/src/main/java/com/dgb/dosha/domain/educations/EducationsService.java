package com.dgb.dosha.domain.educations;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.dgb.dosha.domain.employee.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class EducationsService extends EgovAbstractServiceImpl {
	
	private final EducationsRepository er;
	private final EmployeeRepository employeeRepository;
	String filePath = "/home/ubuntu/DOSHA/educations";
	
	public void upload(Long id, MultipartFile educations) throws IllegalStateException, IOException {
		String originFileName = educations.getOriginalFilename();
		String fileName = System.currentTimeMillis() + originFileName;

		File f = new File(filePath + fileName);
		educations.transferTo(f);
		
		final Educations file = Educations.builder()
				.employee(employeeRepository.findById(id).get())
				.filename(fileName)
				.build();
		er.save(file);
	}
	
	public String load(Long id) {
		Optional<Educations> educations = er.findByEmployee(employeeRepository.findById(id).get());
		
		if (educations.isPresent()) {
			return (filePath + educations.get().getFilename());
		}
		return null;
	}
}
