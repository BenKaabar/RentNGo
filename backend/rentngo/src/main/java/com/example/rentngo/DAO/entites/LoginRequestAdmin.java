package com.example.rentngo.DAO.entites;

public class LoginRequestAdmin {
    private String username;
    private String motdepasse;

    // Getters and Setters
    public String getusername() {
        return username;
    }

    public void setusername(String username) {
        this.username = username;
    }

    public String getmotdepasse() {
        return motdepasse;
    }

    public void setmotdepasse(String motdepasse) {
        this.motdepasse = motdepasse;
    }
}