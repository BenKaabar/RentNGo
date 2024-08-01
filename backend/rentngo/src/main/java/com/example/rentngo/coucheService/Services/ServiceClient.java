package com.example.rentngo.coucheService.Services;

import java.io.IOException;
import java.util.List;

import com.example.rentngo.DAO.entites.Client;

public interface ServiceClient {
    void addClient(String clientRequestDTO) throws IOException;

    Client getClientById(Long id);

    List<Client> getAllClient();

    void updateClient(String clientRequestDTO, Long id) throws IOException;

    void deleteClientById(Long id);

    List<Client> findByNom(String nom);
}
