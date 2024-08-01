package com.example.rentngo.coucheService.ServicesImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rentngo.DAO.entites.Client;
import com.example.rentngo.DAO.repository.ClientRepository;
import com.example.rentngo.coucheService.Services.ServiceClient;
import com.example.rentngo.coucheWeb.DTO.ClientRequestDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

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
    
    private final ObjectMapper objectMapper = new ObjectMapper(); // Create an instance of ObjectMapper

    @Override
    public void addClient(String dto) throws IOException {
        Client client = new Client();
        ClientRequestDTO clientRequestDTO1 = objectMapper.readValue(dto, ClientRequestDTO.class);
        client.setNom(clientRequestDTO1.getNom());
        client.setPrenom(clientRequestDTO1.getPrenom());
        client.setEmail(clientRequestDTO1.getEmail());
        client.setMotDePasse(clientRequestDTO1.getMotDePasse());
        client.setTelephone(clientRequestDTO1.getTelephone());
        client.setAddress(clientRequestDTO1.getAddress());
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
    public void updateClient(String dto, Long id) throws IOException {
        Client client = clientRepository.findById(id).orElse(null);
        if (client != null) {
            ClientRequestDTO clientRequestDTO1 = objectMapper.readValue(dto, ClientRequestDTO.class);
            if (!clientRequestDTO1.getNom().isEmpty()) {
                client.setNom(clientRequestDTO1.getNom());
            }
            if (!clientRequestDTO1.getPrenom().isEmpty()) {
                client.setPrenom(clientRequestDTO1.getPrenom());
            }
            if (!clientRequestDTO1.getEmail().isEmpty()) {
                client.setEmail(clientRequestDTO1.getEmail());
            }
            if (!clientRequestDTO1.getMotDePasse().isEmpty()) {
                client.setMotDePasse(clientRequestDTO1.getMotDePasse());
            }
            if (clientRequestDTO1.getTelephone() != null) {
                client.setTelephone(clientRequestDTO1.getTelephone());
            }
            if (!clientRequestDTO1.getAddress().isEmpty()) {
                client.setAddress(clientRequestDTO1.getAddress());
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

    @Override
    public List<Client> findByNom(String nom) {
        return clientRepository.findByNom(nom);
    }
}
