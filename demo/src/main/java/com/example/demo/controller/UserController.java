package com.example.demo.controller;

import com.example.demo.exception.UserNotFoundException;
import com.example.demo.dto.LoginDTO;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with id " + id + " deleted.";
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginDTO authRequest) {
        User user = userRepository.findByUsername(authRequest.getUsername());
        if (user != null && user.getPassword().equals(authRequest.getPassword())) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @GetMapping("/checkUsername/{username}")
    public ResponseEntity<Boolean> checkUsernameExists(@PathVariable String username) {
        User user = userRepository.findByUsername(username);
        return ResponseEntity.ok(user != null);
    }

    @GetMapping("/checkEmail/{email}")
    public ResponseEntity<Boolean> checkEmailExists(@PathVariable String email) {
        User user = userRepository.findByEmail(email);
        return ResponseEntity.ok(user != null);
    }

    @GetMapping("/checkUsernameForUpdate/{id}/{username}")
    public ResponseEntity<Boolean> checkUsernameForUpdate(@PathVariable Long id, @PathVariable String username) {
        boolean exists = userRepository.existsByUsernameAndIdNot(username, id);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/checkEmailForUpdate/{id}/{email}")
    public ResponseEntity<Boolean> checkEmailForUpdate(@PathVariable Long id, @PathVariable String email) {
        boolean exists = userRepository.existsByEmailAndIdNot(email, id);
        return ResponseEntity.ok(exists);
    }

    @PostMapping("/user/{id}/verify-password")
    public ResponseEntity<?> verifyPassword(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String currentPassword = request.get("currentPassword");
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));

        if (user.getPassword().equals(currentPassword)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid current password");
        }
    }

    @PutMapping("/user/{id}/password")
    public ResponseEntity<?> updatePassword(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String newPassword = request.get("password");
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));

        user.setPassword(newPassword);
        userRepository.save(user);

        return ResponseEntity.ok("Password updated successfully");
    }
}
