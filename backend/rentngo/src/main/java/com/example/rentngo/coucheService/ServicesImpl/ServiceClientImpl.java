package com.example.rentngo.coucheService.ServicesImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.rentngo.DAO.entites.Client;
import com.example.rentngo.DAO.repository.ClientRepository;
import com.example.rentngo.coucheService.Services.ServiceClient;

import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
@Transactional
public class ServiceClientImpl implements ServiceClient {
    final ClientRepository clientRepository;

    @Override
    public Client addClient(Client client) {
        if (client == null) {
            return null;
        }
        return this.clientRepository.save(client);
    }

    @Override
    public Client getClientById(Long id) {
        if (id == null) {
            return null;
        }
        return this.clientRepository.getClientById(id);
    }

    @Override
    public List<Client> getAllClient() {
        return this.clientRepository.findAll();
    }

    @Override
    public Client updateClient(Client client, Long id) {
        Client existingClient = clientRepository.findById(id).orElse(null);
        if (existingClient == null) {
            return null;
        }
        existingClient.setNom(client.getNom());
        existingClient.setPrenom(client.getPrenom());
        existingClient.setEmail(client.getEmail());
        existingClient.setMotDePasse(client.getMotDePasse());
        existingClient.setTelephone(client.getTelephone());
        existingClient.setAddress(client.getAddress());

        return clientRepository.save(existingClient);
    }

    @Override
    public void deleteClientById(Long id) {
        if (id == null) {
            return;
        } else {
            this.clientRepository.deleteById(id);
        }
    }

    @Override
    public List<Client> findByNom(String nom) {
        if (nom == null) {
            return null;
        } else {
            return this.clientRepository.findByNom(nom);
        }
    }

}
