package com.example.rentngo.coucheWeb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rentngo.DAO.entites.Client;
import com.example.rentngo.coucheService.serviceClient.ServiceClient;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@CrossOrigin("*") //Purpose: It allows any domain to make requests to your API. The * wildcard indicates that requests from all origins are permitted.
@RequestMapping(path = "/client")
public class ClientController {
    @Autowired
    private ServiceClient serviceClient;

    // select all client
    @GetMapping(path = "/all")
    public List<Client> getAllClient() {
        return serviceClient.getAllClient();
    }

    // select client by id
    @GetMapping(path = "/{id}")
    public Client getById(@PathVariable("id") Long id) {
        return serviceClient.getClientById(id);
    }

    // select client by nom
    @GetMapping(path = "/ByNom/{nom}")
    public List<Client> findByNom(@PathVariable("nom") String nom) {
        return serviceClient.findByNom(nom);
    }

    // add client
    @PostMapping(path = "/add")
    public Client addClient(@RequestBody Client client) {
        return serviceClient.addClient(client);
    }

    // update client
    @PutMapping(path = "/update/{id}")
    public Client updateClient(@RequestBody Client client, @PathVariable("id") Long id) {
        return serviceClient.updateClient(client, id);
    }

    // delete by id
    @DeleteMapping(path = "/delete/{id}")
    public void deleteClientById(@PathVariable("id") Long id) {
        serviceClient.deleteClientById(id);
    }

}
