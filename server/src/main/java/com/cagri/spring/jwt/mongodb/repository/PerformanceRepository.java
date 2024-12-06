package com.cagri.spring.jwt.mongodb.repository;

import com.cagri.spring.jwt.mongodb.models.Performance;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PerformanceRepository extends MongoRepository<Performance, String> {
    List<Performance> findByUserName(String userName); // Query method to find records by userName
}
