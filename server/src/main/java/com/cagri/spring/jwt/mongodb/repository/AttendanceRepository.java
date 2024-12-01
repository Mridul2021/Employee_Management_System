package com.cagri.spring.jwt.mongodb.repository;

import com.cagri.spring.jwt.mongodb.models.Attendance;  // Correct import
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepository extends MongoRepository<Attendance, String> {
    // Additional custom queries can be defined here
}
