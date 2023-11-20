package com.dgb.dosha.domain.employee.service;

import java.util.List;
import java.util.stream.Collectors;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dgb.dosha.domain.employee.Employee;
import com.dgb.dosha.domain.employee.Role;
import com.dgb.dosha.domain.employee.dto.EmployeeDto;
import com.dgb.dosha.domain.employee.dto.SubmanagerDto;
import com.dgb.dosha.domain.employee.repository.EmployeeRepository;
import com.dgb.dosha.domain.subbranch.SubbranchRepository;
import com.dgb.dosha.global.config.SecurityUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeService extends EgovAbstractServiceImpl {
	private final EmployeeRepository employeeRepository;
	private final SubbranchRepository sr;
    
    public EmployeeDto getMyInfoBySecurity() {
        return employeeRepository.findById(SecurityUtil.getCurrentMemberId())
                .map(EmployeeDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }
    
    public List<SubmanagerDto> getSubmanagers(Long id) {
    	Employee manager = employeeRepository.findById(id).get();
    	List<SubmanagerDto> list = employeeRepository
    								.findByRoleAndBranch(Role.ROLE_SUBMANAGER, manager.getBranch()).stream()
    								.map(Employee::toSubmanagerDto)
    								.collect(Collectors.toList());
    	return list;
    }
    
    public List<EmployeeDto> getAll() {
    	List<EmployeeDto> list = employeeRepository
    								.findAll().stream()
    								.map(Employee::toDto)
    								.collect(Collectors.toList());
    	return list;
    }
    
    public EmployeeDto getMyInfo(Long id) {
    	System.out.println(id);
    	return employeeRepository.findById(id).get().toDto();
    }
}
