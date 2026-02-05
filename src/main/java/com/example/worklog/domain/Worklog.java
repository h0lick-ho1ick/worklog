package com.example.worklog.domain; // 본인의 패키지 경로로 수정하세요

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Entity
@Getter @Setter
@NoArgsConstructor
public class Worklog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;    // 제목
    private String content;  // 내용
    private String groupType;
    private String groupShift;
    private String factory;
    private String category;
    private String system;
    private String machine;
    private String status;

    // 추가: 작성자와의 연관관계 (N:1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users user;

    private LocalDateTime createdAt = LocalDateTime.now(); // 생성시간
}
