package com.cagri.spring.jwt.mongodb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "departments")
public class Department {

    @Id
    private String id;  // MongoDB automatically generates this

    private String name;
    private String description;
    private LocalDateTime createdDate;

    // Constructors
    public Department(String name, String description, LocalDateTime createdDate) {
        this.name = name;
        this.description = description;
        this.createdDate = createdDate;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}
