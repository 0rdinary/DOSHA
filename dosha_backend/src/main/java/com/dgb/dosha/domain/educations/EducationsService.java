package com.dgb.dosha.domain.educations;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
	Path filePath = Paths.get("/home", "ubuntu", "DOSHA", "educations");
	
	public void upload(Long id, MultipartFile educations) {
		String originFileName = educations.getOriginalFilename();
		String fileName = System.currentTimeMillis() + originFileName;
		Path fullPath = filePath.resolve(fileName);
		File f = fullPath.toFile();
		
		if (!f.getParentFile().exists()) {
		    try {
		        Files.createDirectories(f.getParentFile().toPath());
		    } catch (IOException e) {
		        e.printStackTrace();
		    }
		}
		try {
			educations.transferTo(f);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
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
