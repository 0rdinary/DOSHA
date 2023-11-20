package com.dgb.dosha.domain.proceedings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProceedingsRepository extends JpaRepository<Proceedings, Long> {
	
}
