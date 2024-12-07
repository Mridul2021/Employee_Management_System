package com.cagri.spring.jwt.mongodb.repository;

import com.cagri.spring.jwt.mongodb.models.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByUsername(String username);
}
