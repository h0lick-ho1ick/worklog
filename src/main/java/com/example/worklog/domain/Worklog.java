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
    @Column(name = "group_type")
    private String groupType;  //이건 조 구분이라 생각하고 쓰겠습니다
    private String groupShift; // 전근, 후근, 야근 으로 구분 했습니다
    private String factory; //공장 채번으로 구분 했습니다!
    private String category; // 구분 채번 적용하겠습니다
    private String system; //시스템 채번 적용할게용
    private String machine; //머신??
    private String status; //상태로 할게용
    private String assignee; //담당자!!
    private String authorName; //이건 작성자 입니다!
    @Column(name = "work_date")
    private String workDate;
    @Column(name = "start_time")
    private String startTime;
    @Column(name = "end_time")
    private String endTime;
    private String note;
    private String opinion;

    // 추가: 작성자와의 연관관계 (N:1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users user;

    private LocalDateTime createdAt = LocalDateTime.now(); // 생성시간
}
