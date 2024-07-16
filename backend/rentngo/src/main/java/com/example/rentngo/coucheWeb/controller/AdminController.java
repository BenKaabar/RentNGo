package com.example.rentngo.coucheWeb.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.rentngo.DAO.entites.Admin;
import  com.example.rentngo.DAO.entites.Contact;
import  com.example.rentngo.coucheService.Services.AdminService;
//import com.car.car_rental_app.repository.AdminRepository;
import com.example.rentngo.coucheService.Services.ContactService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admins")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
    private ContactService contactService;

    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @PostMapping
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminService.addAdmin(admin);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable(value = "id") Long adminId, @RequestBody Admin adminDetails) {
        Admin updatedAdmin = adminService.updateAdmin(adminId, adminDetails);
        return ResponseEntity.ok(updatedAdmin);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable(value = "id") Long adminId) {
        adminService.deleteAdmin(adminId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Admin> login(@RequestBody Admin admin) {
        Admin existingAdmin = adminService.findByUsername(admin.getUsername());
        if (existingAdmin != null && existingAdmin.getMotdepasse().equals(admin.getMotdepasse())) {
            return ResponseEntity.ok(existingAdmin);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

//Gestion Contact
    @GetMapping("/contacts")
    public List<Contact> getAllContacts() {
        return contactService.getAllContacts();
    }

    @PostMapping("/contacts")
    public Contact createContact(@RequestBody Contact contact) {
        return contactService.addContact(contact);
    }

    @PutMapping("/contacts/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable(value = "id") Long contactId, @RequestBody Contact contactDetails) {
        Contact updatedContact = contactService.updateContact(contactId, contactDetails);
        return ResponseEntity.ok(updatedContact);
    }

    @DeleteMapping("/contacts/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable(value = "id") Long contactId) {
        contactService.deleteContact(contactId);
        return ResponseEntity.noContent().build();
    }
}

/* 
import com.car.car_rental_app.model.User;
import com.car.car_rental_app.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/api/users")
public class AdminUserController {

    @Autowired
    private AdminUserService adminUserService;

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User savedUser = adminUserService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        adminUserService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
 */