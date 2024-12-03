package com.cagri.spring.jwt.mongodb.controllers;

import com.cagri.spring.jwt.mongodb.models.User;
import com.cagri.spring.jwt.mongodb.repository.UserRepository;
import com.cagri.spring.jwt.mongodb.models.Department;
import com.cagri.spring.jwt.mongodb.security.services.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/department")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private UserRepository userRepository;

    // Create department entry
    @PostMapping
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        String currentUsername = getAuthenticatedUsername();
        String currentUserRole = getRoleByUsername(currentUsername);
        if (!"admin".equalsIgnoreCase(currentUserRole)) {
            return ResponseEntity.status(403).build(); // Forbidden if the user is not an admin
        }
        Department createdDepartment = departmentService.createDepartment(department);
        return ResponseEntity.ok(createdDepartment);
    }

    // Get all department entries
    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        String currentUsername = getAuthenticatedUsername();
        String currentUserRole = getRoleByUsername(currentUsername);
        if (!"admin".equalsIgnoreCase(currentUserRole)) {
            return ResponseEntity.status(403).build(); // Forbidden if the user is not an admin
        }
        List<Department> departments = departmentService.getAllDepartments();
        return ResponseEntity.ok(departments);
    }

    // Get department by ID
    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable String id) {
        String currentUsername = getAuthenticatedUsername();
        String currentUserRole = getRoleByUsername(currentUsername);
        if (!"admin".equalsIgnoreCase(currentUserRole)) {
            return ResponseEntity.status(403).build(); // Forbidden if the user is not an admin
        }
        Optional<Department> department = departmentService.getDepartmentById(id);
        return department.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update department entry
    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable String id, @RequestBody Department departmentDetails) {
        String currentUsername = getAuthenticatedUsername();
        String currentUserRole = getRoleByUsername(currentUsername);
        if (!"admin".equalsIgnoreCase(currentUserRole)) {
            return ResponseEntity.status(403).build(); // Forbidden if the user is not an admin
        }
        Department updatedDepartment = departmentService.updateDepartment(id, departmentDetails);
        return ResponseEntity.ok(updatedDepartment);
    }

    // Delete department entry
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable String id) {
        String currentUsername = getAuthenticatedUsername();
        String currentUserRole = getRoleByUsername(currentUsername);
        if (!"admin".equalsIgnoreCase(currentUserRole)) {
            return ResponseEntity.status(403).build(); // Forbidden if the user is not an admin
        }

        departmentService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }

    // Helper method to get the role of the currently authenticated user
    private String getAuthenticatedUserRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().stream()
                .findFirst() // Assuming a single role per user
                .map(GrantedAuthority::getAuthority)
                .orElse(null);
    }

    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    private String getRoleByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        return user.getRole();
    }
}
