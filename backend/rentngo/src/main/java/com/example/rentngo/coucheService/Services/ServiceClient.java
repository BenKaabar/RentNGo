package com.example.rentngo.coucheService.Services;

import java.io.IOException;
import java.util.List;

import com.example.rentngo.DAO.entites.Client;
import com.example.rentngo.coucheWeb.DTO.ClientRequestDTO;

public interface ServiceClient {
    void addClient(ClientRequestDTO clientRequestDTO) throws IOException;

    Client getClientById(Long id);

    List<Client> getAllClient();

    void updateClient(ClientRequestDTO clientRequestDTO, Long id) throws IOException;

    void deleteClientById(Long id);

    List<Client> findByNom(String nom);
    Client authenticate(String email, String motDePasse);
}
