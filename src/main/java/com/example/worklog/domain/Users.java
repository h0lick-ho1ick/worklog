package com.example.worklog.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users") // user는 DB 예약어인 경우가 많아 users로 설정 권장
@Getter @Setter
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username; // 로그인 아이디

    @Column(nullable = false)
    @JsonIgnore
    private String password; // 비밀번호

    private String name;     // 사용자 이름 (예: 홍길동)
    private String role;     // 권한 (예: ADMIN, USER)
}