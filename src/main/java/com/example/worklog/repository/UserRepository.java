import java.util.Map;

import com.example.worklog.domain.User;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Repository
@RestController
@RequiredArgsConstructor
public class UserRepository {
    
    //유저 등록
    @PostMapping("")
    public UserDto getUserById(@PathVariable String account){
        return userService.create(dto);
    }

    //유저 수정
    @PutMapping("/{account}")
    public ResponseEntity<?> updateUser(@PathVariable String account, @RequestBody UsersDto dto, HttpServletRequest request){
        UsersDto loginUser = (UsersDto) request.getAttribute("user");
        if(loginUser == null){
            return ResponseEntity.status(401).body(Map.of("message","로그인이 필요합니다."));
        }
        return ResponseEntity.ok(userService.update(account, dto, loginUser));
    }

    //유저 삭제
    @DeleteMapping("/{account}")
    public UserDto deleteUser(@PathVariable String account) throws Exception{
        return userService.delete(account);
    }

}
