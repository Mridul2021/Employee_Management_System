package com.cagri.spring.jwt.mongodb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "performances")
public class Performance {

    @Id
    private String id;  // MongoDB automatically generates this
    private String userName;
    private String remark;
    private LocalDate date;  // Field to store the date of performance

    // Constructors
    public Performance(String userName, String remark) {
        this.userName = userName;
        this.remark = remark;
        this.date = LocalDate.now();  // Automatically set the current date
    }

    // Getters and setters
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
