package com.dgb.dosha.domain.risk;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DangerRepository extends JpaRepository<Danger, Long> {
	List<Danger> findByRisk(Risk risk);
}
