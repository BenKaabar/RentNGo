package com.example.rentngo.coucheService.serviceClient;

import java.util.List;

import com.example.rentngo.DAO.entites.Client;

public interface ServiceClient {
    public Client addClient(Client client);
    public Client getClientById(Long id);
    public List<Client> getAllClient();
    public Client updateClient(Client client, Long id);
    public void deleteClientById(Long id);
    public List<Client> findByNom(String nom);
}
