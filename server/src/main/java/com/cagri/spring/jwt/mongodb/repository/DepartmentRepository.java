package com.cagri.spring.jwt.mongodb.repository;

import com.cagri.spring.jwt.mongodb.models.Department;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface DepartmentRepository extends MongoRepository<Department, String> {
    Optional<Department> findByName(String name);
}
