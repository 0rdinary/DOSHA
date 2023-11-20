package com.dgb.dosha.global.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {
	private SecurityUtil() {}
	
	public static Long getCurrentMemberId() {
		final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		if (authentication == null || authentication.getName() == null) {
			throw new RuntimeException("인증 정보가 없습니다");
		}
		
		// getName인데 id 타입
		return Long.parseLong(authentication.getName());
	}
}
