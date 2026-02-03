import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Setter@Getter@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Users{
    
    @Id
    //유저 아이디(혹시 몰라서 만들었습니다)
    @Column(length = 20, nullable = false)
    private long id;
    
    //유저 이름
    @Column(length = 20, nullable = false)
    private String name;

    //유저 비번
    @Column(length = 50,nullable = false)
    private String password;
}

public class UserDto {
    private long id;
    private String name;
    private String password;

    //혹시 몰라서 2222
    private String profileImage;


    public UserEntity toEntity(){
        return UserEntity.builder()
            .id(id)
            .password(password)
            .name(name)
            .profileImage(profileImage)
            .build();
    }

    //회원가입시 사용하는 Dto
    public static UserDto toDto(UserEntity uEntity){
        if(uEntity==null) return null;
        return UserDto.builder()
            .id(uEntity.getId())
            .password(uEntity.getPassword)
            .name(uEntity.getName)
            .profileImage(uEntity.getProfileImage)
            .build();
    }
    
}