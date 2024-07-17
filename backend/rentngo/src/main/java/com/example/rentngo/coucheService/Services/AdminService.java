package com.example.rentngo.coucheService.Services;

import com.example.rentngo.DAO.entites.Admin;

import java.util.List;

public interface AdminService {
    List<Admin> getAllAdmins();
    Admin addAdmin(Admin admin);
    Admin updateAdmin(Long id, Admin adminDetails);
    void deleteAdmin(Long id);
    Admin findByUsername(String username);
}

