package com.psk.Billify_backend.service.implementation;

import com.psk.Billify_backend.entity.UserEntity;
import com.psk.Billify_backend.io.UserRequest;
import com.psk.Billify_backend.io.UserResponse;
import com.psk.Billify_backend.repository.UserRepository;
import com.psk.Billify_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(UserRequest request) {
        UserEntity newUser=convertToEntity(request);
        newUser=userRepository.save(newUser);
        return convertToResponse(newUser);
    }

    private UserEntity convertToEntity(UserRequest request) {
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole().toUpperCase())
                .name(request.getName())
                .build();
    }

    private UserResponse convertToResponse(UserEntity newUser) {
        return UserResponse.builder()
                .name(newUser.getName())
                .email(newUser.getEmail())
                .userId(newUser.getUserId())
                .createdAt(newUser.getCreatedAt())
                .updatedAt(newUser.getUpdatedAt())
                .role(newUser.getRole())
                .build();

    }

    @Override
    public String getUserRole(String email) {
        UserEntity existingUser=userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User not found for the email: "+email));

        return existingUser.getRole();
    }

    @Override
    public List<UserResponse> readUsers() {
       return userRepository.findAll()
                .stream()
                .map(user->convertToResponse(user))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {
        UserEntity existingUser=userRepository.findByUserId(id)
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));

        userRepository.delete(existingUser);
    }
}
