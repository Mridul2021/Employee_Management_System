package com.cagri.spring.jwt.mongodb.controllers;

import com.cagri.spring.jwt.mongodb.models.Leave;
import com.cagri.spring.jwt.mongodb.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/leave")
public class LeaveController {

    @Autowired
    private LeaveRepository leaveRepository;

    @PostMapping
    public ResponseEntity<Leave> createLeave(@RequestBody Leave leave) {
        leave.setStatus("Pending");
        leave.setApprovalDate(null);
        Leave createdLeave = leaveRepository.save(leave);
        return ResponseEntity.ok(createdLeave);
    }

    @GetMapping
    public ResponseEntity<List<Leave>> getAllLeaves() {
        List<Leave> leaves = leaveRepository.findAll();
        return ResponseEntity.ok(leaves);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Leave> getLeaveById(@PathVariable String id) {
        Optional<Leave> leave = leaveRepository.findById(id);
        if (leave.isPresent()) {
            return ResponseEntity.ok(leave.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userName}")
    public ResponseEntity<List<Leave>> getLeavesByUserName(@PathVariable String userName) {
        List<Leave> leaves = leaveRepository.findByUserName(userName);
        if (leaves.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(leaves);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Leave> updateLeave(@PathVariable String id, @RequestBody Leave updatedLeave) {
        Optional<Leave> leave = leaveRepository.findById(id);
        if (leave.isPresent()) {
            Leave existingLeave = leave.get();
            existingLeave.setLeaveType(updatedLeave.getLeaveType());
            existingLeave.setStartDate(updatedLeave.getStartDate());
            existingLeave.setEndDate(updatedLeave.getEndDate());
            existingLeave.setReason(updatedLeave.getReason());
            leaveRepository.save(existingLeave);
            return ResponseEntity.ok(existingLeave);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeave(@PathVariable String id) {
        Optional<Leave> leave = leaveRepository.findById(id);
        if (leave.isPresent()) {
            leaveRepository.delete(leave.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Leave> updateLeaveStatus(@PathVariable String id, @RequestBody Leave statusUpdate) {
        Optional<Leave> leave = leaveRepository.findById(id);
        if (leave.isPresent()) {
            Leave existingLeave = leave.get();
            existingLeave.setStatus(statusUpdate.getStatus());
            existingLeave.setApprovalDate(statusUpdate.getApprovalDate());
            leaveRepository.save(existingLeave);
            return ResponseEntity.ok(existingLeave);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
