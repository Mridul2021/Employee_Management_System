package com.cagri.spring.jwt.mongodb.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cagri.spring.jwt.mongodb.models.Attendance;
import com.cagri.spring.jwt.mongodb.repository.AttendanceRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Attendance createAttendance(Attendance attendance) {
        attendance.setTimestamp(LocalDateTime.now());
        Optional<Attendance> existingAttendance = attendanceRepository.findByDateAndUserName(attendance.getDate(), attendance.getUserName());
        if (existingAttendance.isPresent()) {
            throw new IllegalArgumentException("Attendance for this date (" + attendance.getDate() + ") and user (" + attendance.getUserName() + ") already exists.");
        }
        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAllAttendances() {
        return attendanceRepository.findAll();
    }

    public Optional<Attendance> getAttendanceById(String id) {
        return attendanceRepository.findById(id);
    }

    public Attendance updateAttendance(String id, Attendance attendanceDetails) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance not found with id: " + id));
        attendance.setUserName(attendanceDetails.getUserName());
        attendance.setDate(attendanceDetails.getDate());
        attendance.setStatus(attendanceDetails.getStatus());
        attendance.setTimestamp(LocalDateTime.now());
        return attendanceRepository.save(attendance);
    }

    public void deleteAttendance(String id) {
        attendanceRepository.deleteById(id);
    }
    public List<Attendance> getAttendancesByUserName(String userName) {
        return attendanceRepository.findByUserName(userName); // Assuming the repository method exists
    }

}
