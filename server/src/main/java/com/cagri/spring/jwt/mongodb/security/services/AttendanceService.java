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

    // Create or update attendance entry
    public Attendance createAttendance(Attendance attendance) {
        attendance.setTimestamp(LocalDateTime.now()); // Automatically set timestamp on post request
        Optional<Attendance> existingAttendance = attendanceRepository.findByDate(attendance.getDate());
        if (existingAttendance.isPresent()) {
            throw new IllegalArgumentException("Attendance for this date (" + attendance.getDate() + ") already exists.");
        }
        return attendanceRepository.save(attendance);
    }

    // Get all attendance entries
    public List<Attendance> getAllAttendances() {
        return attendanceRepository.findAll();
    }

    // Get attendance by ID
    public Optional<Attendance> getAttendanceById(String id) {
        return attendanceRepository.findById(id);
    }

    // Update attendance entry
    public Attendance updateAttendance(String id, Attendance attendanceDetails) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance not found with id: " + id));
        attendance.setUserName(attendanceDetails.getUserName());
        attendance.setDate(attendanceDetails.getDate());
        attendance.setStatus(attendanceDetails.getStatus());
        attendance.setTimestamp(LocalDateTime.now());
        return attendanceRepository.save(attendance);
    }

    // Delete attendance entry
    public void deleteAttendance(String id) {
        attendanceRepository.deleteById(id);
    }
    // Add this method to the AttendanceService class
    public List<Attendance> getAttendancesByUserName(String userName) {
        return attendanceRepository.findByUserName(userName); // Assuming the repository method exists
    }

}
