package com.cagri.spring.jwt.mongodb.security.services;

import com.cagri.spring.jwt.mongodb.models.Department;
import com.cagri.spring.jwt.mongodb.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;
@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    public Department createDepartment(Department department) {
        // Check if department with the same name already exists
        Optional<Department> existingDepartment = departmentRepository.findByName(department.getName());
        if (existingDepartment.isPresent()) {
            throw new IllegalArgumentException("Department with the name " + department.getName() + " already exists.");
        }
        return departmentRepository.save(department);
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Optional<Department> getDepartmentById(String id) {
        return departmentRepository.findById(id);
    }

    public Department updateDepartment(String id, Department departmentDetails) {
        Department department = departmentRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Department not found with id: " + id));
        department.setName(departmentDetails.getName());
        department.setDescription(departmentDetails.getDescription());
        department.setCreatedDate(departmentDetails.getCreatedDate());
        return departmentRepository.save(department);
    }

    public void deleteDepartment(String id) {
        departmentRepository.deleteById(id);
    }
}
