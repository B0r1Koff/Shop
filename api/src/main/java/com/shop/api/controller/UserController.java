package com.shop.api.controller;

import com.shop.api.dto.UserDTO;
import com.shop.api.entity.Users;
import com.shop.api.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Users> create(@RequestBody UserDTO dto){
        return new ResponseEntity<>(userService.create(dto), HttpStatus.OK);
    }

    @GetMapping("/readAll")
    public ResponseEntity<List<Users>> readAll(){
        return new ResponseEntity<>(userService.readAll(), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Users> update(@RequestBody Users user){
        return new ResponseEntity<>(userService.update(user), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public HttpStatus delete(@PathVariable Long id){
        userService.delete(id);
        return HttpStatus.OK;
    }
}
