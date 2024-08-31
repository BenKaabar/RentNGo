package com.example.rentngo.coucheService.ServicesImpl;

import com.example.rentngo.DAO.entites.Admin;
import com.example.rentngo.DAO.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.rentngo.coucheService.Services.AdminService;
import com.example.rentngo.coucheWeb.DTO.AdminRequestDTO;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.List;
@Slf4j
@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminRepository adminRepository;

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public void addAdmin(AdminRequestDTO adminRequestDTO) throws IOException {
        Admin admin = new Admin();
        admin.setUsername(adminRequestDTO.getUsername());
        admin.setMotdepasse(adminRequestDTO.getMotdepasse());
        adminRepository.save(admin);
        log.info("admin added successfully");
    }

    @Override
    public void updateAdmin(AdminRequestDTO adminRequestDTO, Long id) throws IOException {
        Admin admin = adminRepository.findById(id).orElse(null);
        if (admin != null) {
            admin.setUsername(adminRequestDTO.getUsername());
            admin.setMotdepasse(adminRequestDTO.getMotdepasse());
            adminRepository.save(admin);
            log.info("update admin with id: {} done!-------------------------", id);
        } else {
            log.warn("Attempted to update a admin with id: {} that does not exist-----------------------", id);
        }
    }

    @Override
    public void deleteAdmin(Long id) {
        Admin admin = adminRepository.findById(id).orElse(null);
        if (admin != null) {
            adminRepository.delete(admin);
        } else {
            throw new RuntimeException("Admin with id " + id + " not found");
        }
    }

    @Override
    public Admin findByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    public Admin authenticate(String username, String motDePasse) {
        Admin admin = adminRepository.findByUsername(username);
        if (admin != null && admin.getMotdepasse().equals(motDePasse)) {
            return admin;
        }
        return null;
    }
}