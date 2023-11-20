package com.dgb.dosha.domain.appointments;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dgb.dosha.domain.notification.NotiType;

@Repository
public interface ManagerAppointmentsRepository extends JpaRepository<ManagerAppointments, Long> {
	Optional<ManagerAppointments> findById(Long id);
}
