package com.cagri.spring.jwt.mongodb.controllers;

import com.cagri.spring.jwt.mongodb.models.Notification;
import com.cagri.spring.jwt.mongodb.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    // Create a notification
    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
        Notification createdNotification = notificationRepository.save(notification);
        return ResponseEntity.ok(createdNotification);
    }

    // Get all notifications
    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<Notification> notifications = notificationRepository.findAll();
        return ResponseEntity.ok(notifications);
    }

    // Get notifications by username
    @GetMapping("/{username}")
    public ResponseEntity<List<Notification>> getNotificationsByUsername(@PathVariable String username) {
        List<Notification> notifications = notificationRepository.findByUsername(username);
        if (!notifications.isEmpty()) {
            return ResponseEntity.ok(notifications);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update a notification by ID
    @PutMapping("/{id}")
    public ResponseEntity<Notification> updateNotification(@PathVariable String id, @RequestBody Notification updatedNotification) {
        Notification notification = notificationRepository.findById(id).orElse(null);
        if (notification != null) {
            notification.setMessage(updatedNotification.getMessage());
            notificationRepository.save(notification);
            return ResponseEntity.ok(notification);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a notification by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable String id) {
        Notification notification = notificationRepository.findById(id).orElse(null);
        if (notification != null) {
            notificationRepository.delete(notification);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
