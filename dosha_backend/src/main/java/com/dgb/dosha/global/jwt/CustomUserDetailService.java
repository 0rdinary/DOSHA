package com.dgb.dosha.global.jwt;

import java.util.Collections;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dgb.dosha.domain.employee.Employee;
import com.dgb.dosha.domain.employee.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
//public class CustomUserDetailService extends EgovAbstractServiceImpl implements UserDetailsService  {
public class CustomUserDetailService implements UserDetailsService  {
	private final EmployeeRepository employeeRepository;
	
	@Override
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		return employeeRepository.findById(Long.parseLong(id))
				.map(this::createUserDetails)
				.orElseThrow(() -> new UsernameNotFoundException("id: " + id + " 가 없습니다"));
	}
	
	private UserDetails createUserDetails(Employee employee) {
		GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(employee.getRole().toString());
		
		return new User(
				String.valueOf(employee.getId()),
				employee.getPassword(),
				Collections.singleton(grantedAuthority)
				);
	}
}
