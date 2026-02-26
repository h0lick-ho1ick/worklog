package com.example.worklog.controller;
import org.springframework.http.ResponseEntity;
import com.example.worklog.domain.Worklog;
import com.example.worklog.repository.WorklogRepository; // 레포지토리 이름 확인
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/worklog")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WorklogController {

    // 변수명도 클래스명에 맞춰 변경하는 것이 관례입니다.
    private final WorklogRepository worklogRepository;

    // 모든 일지 목록 가져오기 (GET)
    @GetMapping
    public List<Worklog> getAll() {
        return worklogRepository.findAll();
    }

    // 새 일지 저장하기 (POST)
    @PostMapping
    public Worklog create(@RequestBody Worklog worklog) {
        return worklogRepository.save(worklog);
    }

    // 특정 일지 상세 조회 (GET)
    // 경로 예: /api/worklog/1
    @GetMapping("/{id}")
    public ResponseEntity<Worklog> getById(@PathVariable Long id) {
        return worklogRepository.findById(id)
                .map(ResponseEntity::ok) // 데이터가 있으면 200 OK와 데이터 반환
                .orElse(ResponseEntity.notFound().build()); // 없으면 404 Not Found 반환
    }

    // 특정 일지 삭제하기 (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        worklogRepository.deleteById(id);
        return ResponseEntity.noContent().build(); // 204 No Content 반환
    }

    // 특정 일지 수정하기 (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Worklog> update(@PathVariable Long id, @RequestBody Worklog details) {
        return worklogRepository.findById(id)
                .map(worklog -> {
                    worklog.setTitle(details.getTitle());
                    worklog.setContent(details.getContent());
                    worklog.setGroupType(details.getGroupType());
                    worklog.setGroupShift(details.getGroupShift());
                    worklog.setFactory(details.getFactory());
                    worklog.setCategory(details.getCategory());
                    worklog.setSystem(details.getSystem());
                    worklog.setMachine(details.getMachine());
                    worklog.setStatus(details.getStatus());
                    worklog.setAssignee(details.getAssignee());
                    worklog.setAuthorName(details.getAuthorName());
                    worklog.setWorkDate(details.getWorkDate());
                    worklog.setStartTime(details.getStartTime());
                    worklog.setEndTime(details.getEndTime());
                    worklog.setNote(details.getNote());
                    worklog.setOpinion(details.getOpinion());
                    return ResponseEntity.ok(worklogRepository.save(worklog));
                })
                .orElse(ResponseEntity.notFound().build());
    }




}
