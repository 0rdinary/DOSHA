package com.dgb.dosha.global.jwt;

import java.text.ParseException;
import java.util.Optional;
import java.util.Random;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dgb.dosha.domain.appointments.ManagerAppointmentsService;
import com.dgb.dosha.domain.appointments.SubmanagerAppointmentsService;
import com.dgb.dosha.domain.branch.BranchRepository;
import com.dgb.dosha.domain.educations.EducationsRepository;
import com.dgb.dosha.domain.employee.Employee;
import com.dgb.dosha.domain.employee.dto.EmployeeDto;
import com.dgb.dosha.domain.employee.repository.EmployeeRepository;
import com.dgb.dosha.domain.inspection.InspectionService;
import com.dgb.dosha.domain.notification.NotiType;
import com.dgb.dosha.domain.notification.NotificationDto;
import com.dgb.dosha.domain.notification.NotificationService;
import com.dgb.dosha.domain.subbranch.SubbranchRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AuthService extends EgovAbstractServiceImpl{
	private final AuthenticationManagerBuilder managerBuilder;
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final ManagerAppointmentsService mas;
    private final SubmanagerAppointmentsService sas;
    private final NotificationService ns;
    private final EducationsRepository er;
    private final InspectionService is;
    private final BranchRepository br;
    private final SubbranchRepository sr;
    
    public Optional<RefreshToken> findByRefreshToken(String refreshToken) {
		return refreshTokenRepository.findByRefreshToken(refreshToken);
	}
    
    
    public void saveRefreshToken(TokenDto tokenDto) {
		refreshTokenRepository.findById(tokenDto.getId())
		.ifPresentOrElse(
			r -> {
				r.setRefreshToken(tokenDto.getRefreshToken());
			},
			() -> {
				RefreshToken token = RefreshToken.builder()
												.id(tokenDto.getId())
												.refreshToken(tokenDto.getRefreshToken())
												.build();
				refreshTokenRepository.save(token);
			});
    }
    
    public EmployeeDto signup(EmployeeDto employeeDto) {
    	if (employeeRepository.existsById(employeeDto.getId())) {
    		throw new RuntimeException("ID가 존재합니다");
    	}
    	
    	Employee employee = Employee.builder()
    						.id(employeeDto.getId())
    						.name(employeeDto.getName())
    						.registrationNumber(employeeDto.getRegistrationNumber())
    						.phoneNumber(employeeDto.getPhoneNumber())
    						.password(passwordEncoder.encode(employeeDto.getPassword()))
    						.role(employeeDto.getRole())
    						.position(employeeDto.getPosition())
//    						.branch(br.findById(employeeDto.getBranchCode()).get())
//    						.subbranch(sr.findById(employeeDto.getSubbranchCode()).get())
    						.build();
    	employeeRepository.save(employee);
//    	return employeeDto;
    	return null;
    }
    
    public TokenDto login(EmployeeDto employeeDto) throws ParseException {
		UsernamePasswordAuthenticationToken authenticationToken = employeeDto.toAuthenticationToken();
		
		// authentication : 주무부서장, 본부장
		Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
		
		TokenDto tokenDto = jwtTokenProvider.generateTokenDto(authentication);
		this.saveRefreshToken(tokenDto);
		
//		 알림 생성
		Long id = employeeDto.getId();
		Employee employee = employeeRepository.findById(id).get();
		String role = authentication.getAuthorities().toString();
		if (role.equals("[ROLE_MANAGER]")) { // 안전보건관리 책임자
			// 선임서 등록 안됬을 때 알림 생성
			if (mas.getDto(id).getAppointedDate() == null && 
					!ns.existsByType(id, NotiType.MANAGER_APPOINTMENTS)) {
				log.info("알림을 생성합니다");
				ns.send(NotificationDto.builder()
						.employeeId(employee.getId())
						.notiType(NotiType.MANAGER_APPOINTMENTS)
						.isChecked(false)
						.build()
						);
			}
			// 교육필증 제출 안됬을 때 알림 생성
			if (!er.existsByEmployee(employee) &&
					!ns.existsByType(id, NotiType.MANAGER_EDUCATIONS)) { // 관리감독자
				ns.send(NotificationDto.builder()
						.employeeId(employee.getId())
						.notiType(NotiType.MANAGER_EDUCATIONS)
						.isChecked(false)
						.build()
						);
			}
		} else if (role.equals("[ROLE_SUBMANAGER]")) {
			// 선임서 등록 안됬을 때 알림 생성
			if (sas.getDto(id).getAppointedDate() == null && 
					!ns.existsByType(id, NotiType.SUBMANAGER_APPOINTMENTS)) {
				log.info("알림을 생성합니다");
				ns.send(NotificationDto.builder()
						.employeeId(employee.getId())
						.notiType(NotiType.SUBMANAGER_APPOINTMENTS)
						.isChecked(false)
						.build()
						);
			}
			// 순회 점검 일정이 DURATION(30)일 지났거나 없으면 알림 생성
			if (is.getLastOne(id) == null &&
					!ns.existsByType(id, NotiType.INSPECTION_REQUIRED)) {
				ns.send(NotificationDto.builder()
						.employeeId(employee.getId())
						.notiType(NotiType.INSPECTION_REQUIRED)
						.isChecked(false)
						.build()
						);
			}
		}
		
		
		
		return tokenDto;
	}

    public TokenDto refresh(String bearerRefreshToken) throws AccessDeniedException {
		String refreshToken = jwtTokenProvider.getBearerTokenToString(bearerRefreshToken);
		
		// 유효한토큰인지 확인
		if (!jwtTokenProvider.validateToken(refreshToken)) {
			throw new AccessDeniedException("리프레시토큰이 올바르지 않습니다");
		}

		RefreshToken findRefreshToken = this.findByRefreshToken(refreshToken)
			.orElseThrow(() -> new UsernameNotFoundException("no refresh token"));

		Optional<Employee> employees = employeeRepository.findById(findRefreshToken.getId());
		Employee employee = employees.get();
		Authentication authentication = jwtTokenProvider.getAuthenticationByUserId(employee.getId());
		TokenDto newToken = jwtTokenProvider.generateTokenDto(authentication);

		this.saveRefreshToken(newToken);
		return newToken;
    }
    
    public String generatePassword() {
    	int leftLimit = 48; // 0
    	int rightLimit = 122; // 'z'
    	int passwordLen = 8;
    	Random random = new Random();
    	
    	return random.ints(leftLimit, rightLimit + 1)
    					.filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
    					.limit(passwordLen)
    					.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
    					.toString();
    }
    
    public EmployeeDto resetPassword(EmployeeDto dto) {
    	EmployeeDto result = EmployeeDto.builder()
    							.build();
    	
    	Optional<Employee> employee = employeeRepository.
    									findByIdAndRegistrationNumber(dto.getId(), dto.getRegistrationNumber());
    	
    	if (employee.isPresent()) {
    		String password = this.generatePassword();
    		Employee em = employee.get();
    		
    		// 1. 기존 DB에 암호화된 비밀번호를 저장하고,
    		// 2. 컨트롤러에는 평문 비밀번호로 전달
    		em.setPassword(passwordEncoder.encode(password));
    		employeeRepository.save(em);
    		
    		result.setPassword(password);
    	}
    	
    	return result;
    }
}
