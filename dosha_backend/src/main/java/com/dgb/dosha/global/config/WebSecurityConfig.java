package com.dgb.dosha.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import com.dgb.dosha.global.jwt.JwtFilter;
import com.dgb.dosha.global.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component
public class WebSecurityConfig {
	private final JwtTokenProvider jwtTokenProvider;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.httpBasic().disable()
			.csrf().disable()
	        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	        .and()
	        .authorizeRequests()
	        .antMatchers("/auth/**").permitAll()
	        .antMatchers("/api/meeting/**").access("hasRole('ADMIN')")
	        .antMatchers("/api/employee/**").access("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('SUBMANAGER')")
	        .antMatchers("/api/manager/appointments/**").access("hasRole('MANAGER') or hasRole('ADMIN')")
	        .antMatchers("/api/reason/**").access("hasRole('MANAGER') or hasRole('ADMIN')")
	        .antMatchers("/api/manager/educations/**").access("hasRole('MANAGER') or hasRole('ADMIN')")
	        .antMatchers("/api/inspection/**").access("hasRole('SUBMANAGER') or hasRole('MANAGER') or hasRole('ADMIN')")
	        .antMatchers("/api/risk/**").access("hasRole('SUBMANAGER') or hasRole('MANAGER') or hasRole('ADMIN')")
	        .antMatchers("/api/submanager/appointments/**").access("hasRole('SUBMANAGER') or hasRole('ADMIN')")
	        .antMatchers("/api/submanager/company/**").access("hasRole('SUBMANAGER') or hasRole('ADMIN')")
	        .anyRequest().authenticated()
	        .and()
	        .addFilterBefore(new JwtFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}
}
