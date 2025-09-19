package com.psk.Billify_backend.repository;

import com.psk.Billify_backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Long> {

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByUserId(String userId);
}
