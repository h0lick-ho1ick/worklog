package com.example.worklog.repository;

import com.example.worklog.domain.Handoff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HandoffRepository extends JpaRepository<Handoff, Long> {
    Optional<Handoff> findByWorkDate(String workDate);
}
