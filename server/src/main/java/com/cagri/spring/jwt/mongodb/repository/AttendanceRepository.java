package com.cagri.spring.jwt.mongodb.repository;

import java.util.List;
import java.util.Optional;
import com.cagri.spring.jwt.mongodb.models.Attendance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate; // Import LocalDate

@Repository
public interface AttendanceRepository extends MongoRepository<Attendance, String> {
    List<Attendance> findByUserName(String userName);
    Optional<Attendance> findByDateAndUserName(LocalDate date, String userName);
}
