package com.cagri.spring.jwt.mongodb.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Map;

public class SignupRequest {

    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    @NotBlank // Make role mandatory
    private String role;

    // Optional fields
    private Boolean isActive;
    private Map<String, Object> information;
    private List<Map<String, Object>> leaves;

    // Default constructor (required for deserialization)
    public SignupRequest() {}

    // Parameterized constructor
    public SignupRequest(String username, String email, String password, String role, Boolean isActive,
                         Map<String, Object> information, List<Map<String, Object>> leaves) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isActive = isActive;
        this.information = information;
        this.leaves = leaves;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Map<String, Object> getInformation() {
        return information;
    }

    public void setInformation(Map<String, Object> information) {
        this.information = information;
    }

    public List<Map<String, Object>> getLeaves() {
        return leaves;
    }

    public void setLeaves(List<Map<String, Object>> leaves) {
        this.leaves = leaves;
    }
}