package com.example.rentngo.coucheService.ServicesImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rentngo.DAO.entites.Client;
import com.example.rentngo.DAO.enums.Role;
import com.example.rentngo.DAO.repository.ClientRepository;
import com.example.rentngo.coucheService.Services.ServiceClient;
import com.example.rentngo.coucheWeb.DTO.ClientRequestDTO;

import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Service
@Slf4j
@Transactional
public class ServiceClientImpl implements ServiceClient {
    @Autowired
    private ClientRepository clientRepository;

    @Override
    public void addClient(ClientRequestDTO dto) throws IOException {
        Client client = new Client();
        client.setNom(dto.getNom());
        client.setPrenom(dto.getPrenom());
        client.setEmail(dto.getEmail());
        client.setMotDePasse(dto.getMotDePasse());
        client.setTelephone(dto.getTelephone());
        client.setAddress(dto.getAddress());
        client.setRole(Role.CLIENT);
        clientRepository.save(client);
        log.info("Client added successfully----------------------");
    }

    @Override
    public Client getClientById(Long id) {
        return clientRepository.findById(id).orElseThrow(() -> new RuntimeException("Client not found"));
    }

    @Override
    public List<Client> getAllClient() {
        return this.clientRepository.findAll();
    }

    @Override
    public void updateClient(ClientRequestDTO dto, Long id) throws IOException {
        Client client = clientRepository.findById(id).orElse(null);
        if (client != null) {
            if (dto.getNom() != null && !dto.getNom().isEmpty()) {
                client.setNom(dto.getNom());
            }
            if (dto.getPrenom() != null && !dto.getPrenom().isEmpty()) {
                client.setPrenom(dto.getPrenom());
            }
            if (dto.getEmail() != null && !dto.getEmail().isEmpty()) {
                client.setEmail(dto.getEmail());
            }
            if (dto.getMotDePasse() != null && !dto.getMotDePasse().isEmpty()) {
                client.setMotDePasse(dto.getMotDePasse());
            }
            if (dto.getTelephone() != null) {
                client.setTelephone(dto.getTelephone());
            }
            if (dto.getAddress() != null && !dto.getAddress().isEmpty()) {
                client.setAddress(dto.getAddress());
            }
            clientRepository.save(client);
            log.info("Updated client with id: {} done!--------------------", id);
        } else {
            log.warn("Attempted to update a client with id: {} that does not exist----------------------", id);
        }
    }

    @Override
    public void deleteClientById(Long id) {
        Client client = clientRepository.findById(id).orElse(null);
        if (client != null) {
            clientRepository.delete(client);
            log.info("Deleted client with id: {}----------------------", id);
        } else {
            log.warn("Attempted to delete a client with id: {} that does not exist--------------------", id);
        }
    }

    // login
    @Override
    public Client findByEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    // public Client authenticate(String email, String motDePasse) {
    // Client client = clientRepository.findByEmail(email);
    // // Use the password encoder to check if the password matches
    // if (client != null && passwordEncoder.matches(motDePasse,
    // client.getMotDePasse())) {
    // return client;
    // }
    // return null;
    // }
    @Override
    public Client authenticate(String email, String motDePasse) {
        // Fetch the client by email
        Client client = clientRepository.findByEmail(email);

        log.info("********************* motDePasse " + motDePasse);
        log.info("(\"********************* email " + email);
        // Check if the client exists and if the plain-text password matches
        if (client != null && motDePasse.equals(client.getMotDePasse())) {

            log.info("(\"********************* Successful authentication");
            return client; // Successful authentication
        }
        return null; // Authentication failed
    }

}
