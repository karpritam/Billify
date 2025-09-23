package com.psk.Billify_backend.controller;

import com.psk.Billify_backend.io.UserRequest;
import com.psk.Billify_backend.io.UserResponse;
import com.psk.Billify_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public UserResponse registerUser(@RequestBody UserRequest request){
        try{
            return userService.createUser(request);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Unable to create user"+e.getMessage());
        }
    }

    @GetMapping("/users")
    public List<UserResponse> readUser(){
        return userService.readUsers();
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable String id){
        try{
            userService.deleteUser(id);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"User not found");
        }
    }
}
