package com.dgb.dosha.domain.appointments;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmanagerAppointmentsRepository extends 
	JpaRepository<SubmanagerAppointments, Long> {
	Optional<SubmanagerAppointments> findById(Long id);
}
