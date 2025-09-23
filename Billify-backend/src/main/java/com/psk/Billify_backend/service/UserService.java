package com.psk.Billify_backend.service;

import com.psk.Billify_backend.io.UserRequest;
import com.psk.Billify_backend.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
