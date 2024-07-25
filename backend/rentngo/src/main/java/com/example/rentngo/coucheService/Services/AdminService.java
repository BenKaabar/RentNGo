package com.example.rentngo.coucheService.Services;

import com.example.rentngo.DAO.entites.Admin;
import com.example.rentngo.coucheWeb.DTO.AdminRequestDTO;

import java.io.IOException;
import java.util.List;

public interface AdminService {
    List<Admin> getAllAdmins();

    void addAdmin(AdminRequestDTO adminRequestDTO) throws IOException;

    void updateAdmin(AdminRequestDTO adminRequestDTO, Long id) throws IOException;

    void deleteAdmin(Long id);

    Admin findByUsername(String username);
}