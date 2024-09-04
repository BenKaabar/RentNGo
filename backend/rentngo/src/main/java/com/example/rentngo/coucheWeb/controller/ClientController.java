package com.example.rentngo.coucheWeb.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.rentngo.DAO.entites.Client;
import com.example.rentngo.DAO.entites.LoginRequest;
import com.example.rentngo.coucheService.Services.ServiceClient;
import com.example.rentngo.coucheWeb.DTO.ClientRequestDTO;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@CrossOrigin("*") // Allows any domain to make requests to your API
@RequestMapping(path = "/client")
public class ClientController {

    @Autowired
    private final ServiceClient serviceClient;

    // Select all clients
    @GetMapping(path = "/all")
    public ResponseEntity<List<Client>> getAllClient() {
        try {
            List<Client> clients = serviceClient.getAllClient();
            return ResponseEntity.ok(clients);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    // Select client by ID
    @GetMapping(path = "/by/{id}")
    public ResponseEntity<Client> getById(@PathVariable("id") Long id) {
        try {
            Client client = serviceClient.getClientById(id);
            return ResponseEntity.ok(client);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @GetMapping(path = "/ByEmail/{email}")
    public ResponseEntity<Client> findByEmail(@PathVariable("email") String email) {
        try {
            Client client = serviceClient.findByEmail(email);
            return ResponseEntity.ok(client);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Add client
    @PostMapping(path = "/add")
    public ResponseEntity<String> addClient(@RequestBody ClientRequestDTO clientRequestDTO) {
        try {
            serviceClient.addClient(clientRequestDTO);
            return ResponseEntity.ok("Client added successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    // Update client
    @PutMapping(path = "/update/{id}")
    public ResponseEntity<String> updateClient(@PathVariable Long id, @RequestBody ClientRequestDTO clientRequestDTO) {
        try {
            serviceClient.updateClient(clientRequestDTO, id);
            return ResponseEntity.ok("Client updated successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    // Delete client by ID
    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteClientById(@PathVariable Long id) {
        try {
            serviceClient.deleteClientById(id);
            return ResponseEntity.ok("Client deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Client not found with id: " + id);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginClient(@RequestBody LoginRequest loginRequest, HttpSession session) {
        String email = loginRequest.getEmail();
        String motDePasse = loginRequest.getMotDePasse();

        Client client = serviceClient.authenticate(email, motDePasse);

        if (client != null) {
            session.setAttribute("user", client);
            session.setAttribute("role", "CLIENT");
            return ResponseEntity.ok("Client authenticated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("client Logged out successfully!");
    }

}
