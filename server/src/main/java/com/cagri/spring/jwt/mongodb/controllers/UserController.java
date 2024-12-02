package com.cagri.spring.jwt.mongodb.controllers;

import com.cagri.spring.jwt.mongodb.models.User;
import com.cagri.spring.jwt.mongodb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Method to update login time
    @GetMapping("/updateLoginTime/{username}")
    public String updateLoginTime(@PathVariable("username") String username, @RequestBody String loginTime) {
        // Get the currently authenticated username from the JWT token
        String currentUsername = getAuthenticatedUsername();

        // Check if the username in the path matches the authenticated user
        if (!currentUsername.equals(username)) {
            return "Error: Unauthorized access!";
        }

        // Find the user by username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        // Add the login time to the loginTime array
        user.getLoginTime().add(loginTime);
        userRepository.save(user);

        return "Login time added successfully!";
    }

    // Method to update user information
    @PutMapping("/updateInfo/{username}")
    public String updateUserInformation(@PathVariable("username") String username, @RequestBody Map<String, Object> updatedInformation) {
        // Get the currently authenticated username from the JWT token
        String currentUsername = getAuthenticatedUsername();

        // Check if the username in the path matches the authenticated user
        if (!currentUsername.equals(username)) {
            return "Error: Unauthorized access!";
        }

        // Find the user by username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        // Update the information field with the new data
        user.setInformation(updatedInformation);
        userRepository.save(user);

        return "User information updated successfully!";
    }

    // Method to add a new leave request
    @PostMapping("/addLeave/{username}")
    public String addLeaveRequest(@PathVariable("username") String username, @RequestBody Map<String, Object> leaveRequest) {
        // Get the currently authenticated username from the JWT token
        String currentUsername = getAuthenticatedUsername();

        // Check if the username in the path matches the authenticated user
        if (!currentUsername.equals(username)) {
            return "Error: Unauthorized access!";
        }

        // Find the user by username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        // Add the new leave request to the user's leave list
        user.getLeaves().add(leaveRequest);
        userRepository.save(user);

        return "Leave request added successfully!";
    }

    // Method to update the entire leaves array
    @PutMapping("/updateLeaves/{username}")
    public String updateLeaves(@PathVariable("username") String username, @RequestBody List<Map<String, Object>> updatedLeaves) {
        // Get the currently authenticated username from the JWT token
        String currentUsername = getAuthenticatedUsername();

        // Check if the username in the path matches the authenticated user
        if (!currentUsername.equals(username)) {
            return "Error: Unauthorized access!";
        }

        // Find the user by username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        // Update the entire leaves array with the new list
        user.setLeaves(updatedLeaves);
        userRepository.save(user);

        return "Leaves updated successfully!";
    }

    // Method to update user status
    @PutMapping("/updateStatus/{username}")
    public String updateUserStatus(@PathVariable("username") String username, @RequestBody Boolean newStatus) {
        // Get the currently authenticated username from the JWT token
        String currentUsername = getAuthenticatedUsername();

        // Check if the username in the path matches the authenticated user
        if (!currentUsername.equals(username)) {
            return "Error: Unauthorized access!";
        }

        // Find the user by username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        // Update the user's status
        user.setIsActive(newStatus);
        userRepository.save(user);

        return "User status updated successfully!";
    }

    // Method to delete a user by username
    @DeleteMapping("/delete/{username}")
    public String deleteUser(@PathVariable("username") String username) {
        // Find the user by username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        // Delete the user from the repository
        userRepository.delete(user);

        return "User deleted successfully!";
    }


    //return all data
    // Method to get all users' data
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    // Helper method to get the username of the currently authenticated user
    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
