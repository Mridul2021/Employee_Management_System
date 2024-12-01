package com.cagri.spring.jwt.mongodb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Document(collection = "users")
public class User {

  @Id
  private String id;

  private String username;
  private String email;
  private String password;
  private List<String> loginTime = new ArrayList<>();
  private Boolean isActive = false; // Default value
  private Map<String, Object> information;
  private List<Map<String, Object>> leaves = new ArrayList<>();
  private String role; // Added role field


  public User(String username, String email, String password, String role) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  // Getters and setters
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

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

  public List<String> getLoginTime() {
    return loginTime;
  }

  public void setLoginTime(List<String> loginTime) {
    this.loginTime = loginTime;
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

  public String getRole() { // Getter for role
    return role;
  }

  public void setRole(String role) { // Setter for role
    this.role = role;
  }
}
