import com.example.worklog.repository.UserRepository;
import com.example.worklog.domain.Users;

import org.springframework.data.convert.ReadingConverter;
import org.springframework.stereotype.Service;

@Service
@ReadingConverter
public class UserService {
    private final UserRepository UserRepository;

    //유저 생성
    public UserDto create(UsersDto dto){
        boolean isDuplicate = UserRepository.existsByAccount(dto.getAccount());
        UserEntity usersEntity = UserRepository.save(dto.toEntity);
        return UserDto.toDto(usersEntity);
    }

    //유저 수정
    public UsersDto update(String account, UserDto newUser, UserDto loginUser){
        UserDto user = UserDto.toDto(UserRepository.findByAccount(account).orElseGet(()->null));
        if(user==null) return null; //만약 유저가 없을시 수정 불가.
        if(loginUser == null) return null; //로그인 필요
        if(newUser.getName() != null) user.setName(newUser.getName());
        if(newUser.getPassword() != null) user.setPassword(newUser.getPassword());
        if(newUser.getProfileImage() != null) user.setProfileImage(newUser.getProfileImage());
        UserEntity UserEntity = UserRepository.save(user.toEntity());
        return UsersDto.toDto(UserEntity);
    }
    
    //유저 삭제
    public UserDto delete(String account) throws Exception{
        UserEntity user = UserRepository.findByAccount(account).orElseGet(()->null);
        if(user != null){
            try{
                UserRepository.deleteById(user.getId());
                return UserDto.toDto(user);
            } catch (Exception e){
                throw new Exception("삭제 할 수 없음");
            }
        }
        return null;
    }
}