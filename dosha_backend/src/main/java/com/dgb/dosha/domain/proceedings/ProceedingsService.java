package com.dgb.dosha.domain.proceedings;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import com.dgb.dosha.domain.employee.Employee;
import com.dgb.dosha.domain.employee.repository.EmployeeRepository;
import com.dgb.dosha.domain.notification.NotiType;
import com.dgb.dosha.domain.notification.Notification;
import com.dgb.dosha.domain.notification.NotificationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProceedingsService extends EgovAbstractServiceImpl {

	private final ProceedingsRepository pr;
	private final MemberRepository mr;
	private final EmployeeRepository er;
	private final NotificationRepository nr;
	
	
	public List<ProceedingsDto> getAll() {
		List<Proceedings> proceedingss = pr.findAll();
		
		return proceedingss.stream()
				.map(Proceedings::toDto)
				.collect(Collectors.toList());
	}
	
	public List<ProceedingsDto> get(Long memberId) {
		List<Member> members = mr.findByEmployee(er.findById(memberId).get());
		
		return members.stream()
				.map(member -> member.getProceedings().toDto())
				.collect(Collectors.toList());
	}
	
	public void regist(ProceedingsDto dto) {
		List<Long> employeeIds = dto.getMemberIds();
		List<Member> members = new ArrayList<Member>();
		
		Proceedings proceedings = Proceedings.builder()
									.date(dto.getDate())
									.location(dto.getLocation())
									.type(dto.getType())
									.contents(dto.getContents())
									.others(dto.getOthers())
									.notes(dto.getNotes())
									.completed(dto.isCompleted())
									.build();
		
		for (Long id: employeeIds) {
			Employee employee = er.findById(id).get();
			members.add(Member.builder()
					.employee(employee)
					.proceedings(proceedings)
					.checked(false)
					.build());
			
			nr.save(Notification.builder()
					.employee(employee)
					.notiType(NotiType.PROCEEDINGS_CHECKED)
					.isChecked(false)
					.build());
		}
		
		proceedings.setMember(members);
		pr.save(proceedings);
	}
	
	public void edit(ProceedingsDto dto) {
		Proceedings proceedings = pr.findById(dto.getId()).get();
		
		proceedings.setDate(dto.getDate());
		proceedings.setLocation(dto.getLocation());
		proceedings.setType(dto.getType());
		proceedings.setContents(dto.getContents());
		proceedings.setContents(dto.getContents());
		proceedings.setOthers(dto.getOthers());
		proceedings.setNotes(dto.getNotes());
		proceedings.setCompleted(dto.isCompleted());
		
		pr.save(proceedings);
	}
	
	public void check(Long proceedingId, Long memberId) {
		Member member = mr.findByProceedingsAndEmployee(
				pr.findById(proceedingId).get(), 
				er.findById(memberId).get()).get();
		
		member.setChecked(true);
		mr.save(member);
	}
}
