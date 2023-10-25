package com.shop.api.service;

import com.shop.api.dto.UserDTO;
import com.shop.api.entity.Users;
import com.shop.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Users create(UserDTO dto){
        Users user = Users.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .role(dto.getRole())
                .build();
        return userRepository.save(user);
    }

    public List<Users> readAll(){
        return userRepository.findAll();
    }

    public Users update(Users user){
        return userRepository.save(user);
    }

    public void delete(Long id){
        userRepository.deleteById(id);
    }
}
