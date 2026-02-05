package com.example.worklog.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "handoff")
public class Handoff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "work_date")
    private String workDate;

    @Column(columnDefinition = "text")
    private String received;

    @Column(columnDefinition = "text")
    private String sent;

    private LocalDateTime updatedAt = LocalDateTime.now();
}
