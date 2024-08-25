package com.example.rentngo.coucheWeb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.rentngo.DAO.entites.Admin;
import com.example.rentngo.coucheService.Services.AdminService;
import com.example.rentngo.coucheWeb.DTO.AdminRequestDTO;

import java.io.IOException;
import java.util.List;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private final AdminService adminService;

    // Get all admins
    @GetMapping("/all")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        try {
            List<Admin> admins = adminService.getAllAdmins();
            return ResponseEntity.ok(admins);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    // Create new admin
    @PostMapping("/add")
    public ResponseEntity<String> createAdmin(@RequestBody AdminRequestDTO adminRequestDTO) {
        try {
            adminService.addAdmin(adminRequestDTO);
            return ResponseEntity.ok("Admin added successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    // Update existing admin
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateAdmin(@PathVariable Long id, @RequestBody AdminRequestDTO adminRequestDTO) {
        try {
            adminService.updateAdmin(adminRequestDTO, id);
            return ResponseEntity.ok("Admin updated successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    // Delete admin by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Long id) {
        try {
            adminService.deleteAdmin(id);
            return ResponseEntity.ok("Admin deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Admin not found with id: " + id);
        }
    }
}