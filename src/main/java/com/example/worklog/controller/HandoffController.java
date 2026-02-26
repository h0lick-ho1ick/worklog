package com.example.worklog.controller;

import com.example.worklog.domain.Handoff;
import com.example.worklog.repository.HandoffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/handoff")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HandoffController {
    private final HandoffRepository handoffRepository;

    @GetMapping
    public ResponseEntity<Handoff> getByDate(@RequestParam("date") String date) {
        Optional<Handoff> found = handoffRepository.findByWorkDate(date);
        return found.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PostMapping
    public Handoff upsert(@RequestBody Handoff payload) {
        if (payload.getWorkDate() == null || payload.getWorkDate().isBlank()) {
            return handoffRepository.save(payload);
        }
        Optional<Handoff> found = handoffRepository.findByWorkDate(payload.getWorkDate());
        if (found.isPresent()) {
            Handoff existing = found.get();
            existing.setReceived(payload.getReceived());
            existing.setSent(payload.getSent());
            return handoffRepository.save(existing);
        }
        return handoffRepository.save(payload);
    }
}
