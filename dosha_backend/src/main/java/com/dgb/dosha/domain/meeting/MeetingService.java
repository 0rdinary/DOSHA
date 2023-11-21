package com.dgb.dosha.domain.meeting;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MeetingService extends EgovAbstractServiceImpl {

	private final MeetingRepository mr;
	String filePath = "/meeting/";
	
	public void regist(String name, MultipartFile meeting) {
		String originFileName = meeting.getOriginalFilename();
		String fileName = System.currentTimeMillis() + originFileName;
		
		File f = new File(filePath + fileName);
		if (!f.exists()) {
			try {
				f.mkdirs();
			} catch (Exception e) {
				
			}
		}
		try {
			meeting.transferTo(f);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		mr.save(Meeting.builder()
				.name(name)
				.filename(fileName)
				.build());
	}

	public String load(Long id) {
		return (filePath + mr.findById(id).get().getFilename());
	}
	
	public List<MeetingDto> getAll() {
		List<Meeting> meetings = mr.findAll();
		
		return meetings.stream()
				.map(Meeting::toDto)
				.collect(Collectors.toList());
	}
}
