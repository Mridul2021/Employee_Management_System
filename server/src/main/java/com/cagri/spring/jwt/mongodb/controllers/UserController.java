package com.cagri.spring.jwt.mongodb.controllers;
import java.util.HashMap;
import com.cagri.spring.jwt.mongodb.models.User;
import com.cagri.spring.jwt.mongodb.payload.response.MessageResponse;
import com.cagri.spring.jwt.mongodb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.security.crypto.password.PasswordEncoder;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;
    @GetMapping("/updateLoginTime/{username}")
    public String updateLoginTime(@PathVariable("username") String username, @RequestBody String loginTime) {
        String currentUsername = getAuthenticatedUsername();

        if (!currentUsername.equals(username)) {
            return "Error: Unauthorized access!";
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        user.getLoginTime().add(loginTime);
        userRepository.save(user);

        return "Login time added successfully!";
    }

    @PutMapping("/updateInfo/{username}")
    public String updateUserInformation(@PathVariable("username") String username, @RequestBody Map<String, Object> updatedInformation) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        user.setInformation(new HashMap<>());

        if (updatedInformation.containsKey("information")) {
            Map<String, Object> info = (Map<String, Object>) updatedInformation.get("information");
            user.setInformation(info);
        }
        userRepository.save(user);
        return "User information updated successfully!";
    }

    @PostMapping("/addLeave/{username}")
    public String addLeaveRequest(@PathVariable("username") String username, @RequestBody Map<String, Object> leaveRequest) {
        String currentUsername = getAuthenticatedUsername();
        if (!currentUsername.equals(username)) {
            return "Error: Unauthorized access!";
        }
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));
        user.getLeaves().add(leaveRequest);
        userRepository.save(user);

        return "Leave request added successfully!";
    }

    @PutMapping("/updateLeaves/{username}")
    public String updateLeaves(@PathVariable("username") String username, @RequestBody List<Map<String, Object>> updatedLeaves) {
        String currentUsername = getAuthenticatedUsername();
        if (!currentUsername.equals(username)) {
            return "Error: Unauthorized access!";
        }
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));
        user.setLeaves(updatedLeaves);
        userRepository.save(user);

        return "Leaves updated successfully!";
    }

    @PutMapping("/updateStatus/{username}")
    public String updateUserStatus(@PathVariable("username") String username, @RequestBody Boolean newStatus) {
        String currentUsername = getAuthenticatedUsername();
        if (!currentUsername.equals(username)) {
            return "Error: Unauthorized access!";
        }
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));
        user.setIsActive(newStatus);
        userRepository.save(user);
        return "User status updated successfully!";
    }

    @DeleteMapping("/delete/{username}")
    public String deleteUser(@PathVariable("username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));
        userRepository.delete(user);
        return "User deleted successfully!";
    }
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/getUser/{username}")
    public User getUserInformation(@PathVariable("username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        return user;
    }
    @PutMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> passwords) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        if (!encoder.matches(passwords.get("currentPassword"), user.getPassword())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Current password is incorrect."));
        }

        user.setPassword(encoder.encode(passwords.get("newPassword")));
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Password changed successfully!"));
    }
    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
