package com.dgb.dosha.global.jwt;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long>{
	public Optional<RefreshToken> findById(Long id);
	public Optional<RefreshToken> findByRefreshToken(String refreshToken);
}
