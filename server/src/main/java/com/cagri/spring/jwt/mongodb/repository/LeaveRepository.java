package com.cagri.spring.jwt.mongodb.repository;

import com.cagri.spring.jwt.mongodb.models.Leave;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LeaveRepository extends MongoRepository<Leave, String> {
    List<Leave> findByUserName(String userName);
}
