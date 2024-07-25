package com.example.rentngo.coucheService.ServicesImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rentngo.DAO.entites.Client;
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
    public void addClient(ClientRequestDTO clientRequestDTO) throws IOException {
        Client client = new Client();
        client.setNom(clientRequestDTO.getEmail());
        client.setPrenom(clientRequestDTO.getPrenom());
        client.setEmail(clientRequestDTO.getEmail());
        client.setMotDePasse(clientRequestDTO.getMotDePasse());
        client.setTelephone(clientRequestDTO.getTelephone());
        client.setAddress(clientRequestDTO.getAddress());
        clientRepository.save(client);
        log.info("client added successfully----------------------");
    }

    @Override
    public Client getClientById(Long id) {
        return clientRepository.findById(id).orElseThrow(() -> new RuntimeException("client not found"));
    }

    @Override
    public List<Client> getAllClient() {
        return this.clientRepository.findAll();
    }

    @Override
    public void updateClient(ClientRequestDTO clientRequestDTO, Long id) {
        Client client = clientRepository.findById(id).orElse(null);
        if (client != null) {
            if (clientRequestDTO.getNom() != "") {
                client.setNom(client.getNom());
            }
            if (clientRequestDTO.getPrenom() != "") {
                client.setPrenom(client.getPrenom());
            }
            if (clientRequestDTO.getEmail() != "") {
                client.setEmail(client.getEmail());
            }
            if (clientRequestDTO.getMotDePasse() != "") {
                client.setMotDePasse(client.getMotDePasse());
            }
            if (clientRequestDTO.getTelephone() != null) {
                client.setTelephone(client.getTelephone());
            }
            if (clientRequestDTO.getAddress() != "") {
                client.setAddress(client.getAddress());
            }
            log.info("update client with id: {} done!--------------------", id);
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