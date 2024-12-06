package com.cagri.spring.jwt.mongodb.controllers;

import com.cagri.spring.jwt.mongodb.models.Performance;
import com.cagri.spring.jwt.mongodb.repository.PerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/performance")
public class PerformanceController {

    @Autowired
    private PerformanceRepository performanceRepository;

    // Create a performance entry
    @PostMapping
    public ResponseEntity<Performance> createPerformance(@RequestBody Performance performance) {
        Performance createdPerformance = performanceRepository.save(performance);
        return ResponseEntity.ok(createdPerformance);
    }

    // Get all performance entries
    @GetMapping
    public ResponseEntity<List<Performance>> getAllPerformances() {
        List<Performance> performances = performanceRepository.findAll();
        return ResponseEntity.ok(performances);
    }

    // Get a performance entry by username
    @GetMapping("/{userName}")
    public ResponseEntity<List<Performance>> getPerformanceByUserName(@PathVariable String userName) {
        List<Performance> performances = performanceRepository.findByUserName(userName);
        if (!performances.isEmpty()) {
            return ResponseEntity.ok(performances);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update a performance entry by username
    @PutMapping("/{userName}")
    public ResponseEntity<Performance> updatePerformance(@PathVariable String userName, @RequestBody Performance updatedPerformance) {
        List<Performance> performances = performanceRepository.findByUserName(userName);
        if (!performances.isEmpty()) {
            // Assuming only one performance record per userName
            Performance performance = performances.get(0);
            performance.setRemark(updatedPerformance.getRemark());
            performanceRepository.save(performance);
            return ResponseEntity.ok(performance);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerformance(@PathVariable String id) {
        // Find performance by id
        Performance performance = performanceRepository.findById(id).orElse(null);
        if (performance != null) {
            performanceRepository.delete(performance);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
