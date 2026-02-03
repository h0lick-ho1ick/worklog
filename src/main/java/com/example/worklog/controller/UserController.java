import com.example.worklog.repository.UserRepository;
import com.example.worklog.domain.Users;

import org.springframework.data.convert.ReadingConverter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@ReadingConverter
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository UserRepository;

    //유저 등록
    @PostMapping("")
    public UserDto createUser(@RequestBody UsersDto dto){
        return userService.create(dto);
    }

    //유저 수정
    @PostMapping("/{account}")
    public ResponseEntity updateUser(@PathVariable String account, @RequestBody UserDto dto, HttpServletRequest request){
    UsersDto loginUser = (UsersDto) request.getAttribute("user");
    if(loginUser == null){
        return ResponseEntity.status(401).body(Map.of("message", "로그인이 필요합니다."));
    }
    return ResponseEntity.ok(userService.update(account,dto,loginUser));
    }

    //유저 삭제
    @DeleteMapping("/{account}")
    public UserDto deleteUser(@PathVariable String account) throws Exception{
        return usersService.delete(account);
    }
    
}
