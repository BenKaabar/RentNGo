package com.example.rentngo.coucheService.ServicesImpl;

import com.example.rentngo.DAO.entites.Voiture;
import com.example.rentngo.DAO.repository.VoitureRepository;
import com.example.rentngo.coucheService.Services.VoitureService;
import com.example.rentngo.coucheWeb.DTO.VoitureRequestDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;

import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@AllArgsConstructor
@Service
@Transactional

public class VoitureServiceImpl implements VoitureService {
    @Autowired
    private VoitureRepository carRepository;

    @Override
    public List<Voiture> getAllCars() {
        return carRepository.findAll();
    }

    @Override
    public void deleteCar(Long id) {
        Voiture car = carRepository.findById(id).get();
        carRepository.delete(car);
    }

    @Override
    public void addCar(String voitureRequestDTO, MultipartFile File) throws IOException {
        VoitureRequestDTO voitureRequestDTO1 = new ObjectMapper().readValue(voitureRequestDTO,
                VoitureRequestDTO.class);
        Voiture voiture = new Voiture();
        voiture.setImmatriculation(voitureRequestDTO1.getImmatriculation());
        voiture.setMarque(voitureRequestDTO1.getMarque());
        voiture.setPrix(voitureRequestDTO1.getPrix());
        voiture.setCouleur(voitureRequestDTO1.getCouleur());
        voiture.setCategorie(voitureRequestDTO1.getCategorie());
        voiture.setGarantie(voitureRequestDTO1.getGarantie());
        voiture.setPhotoVoiture(compressBytes(File.getBytes()));
        voiture.setTypePhotoVoiture(File.getContentType());
        voiture.setNomPhotoVoiture(File.getOriginalFilename());
        carRepository.save(voiture);
    }

    @Override
    public Voiture findCarById(Long id) {
        return carRepository.findById(id).get();
    }

    @Override
    public void updateCar(String voitureRequestDTO, MultipartFile File) throws IOException {
        VoitureRequestDTO voitureRequestDTO1 = new ObjectMapper().readValue(voitureRequestDTO,
                VoitureRequestDTO.class);
        Voiture voiture = new Voiture();
        if (voitureRequestDTO1.getGarantie() != 0) {
            voiture.setGarantie(voitureRequestDTO1.getGarantie());
        }
        if (voitureRequestDTO1.getImmatriculation() != "") {
            voiture.setImmatriculation(voitureRequestDTO1.getImmatriculation());
        }
        if (voitureRequestDTO1.getMarque() != "") {
            voiture.setMarque(voitureRequestDTO1.getMarque());
        }
        if (voitureRequestDTO1.getPrix() != null) {
            voiture.setPrix(voitureRequestDTO1.getPrix());
        }
        if (voitureRequestDTO1.getCouleur() != "") {
            voiture.setCouleur(voitureRequestDTO1.getCouleur());
        }
        if (voitureRequestDTO1.getCategorie() != "") {
            voiture.setCategorie(voitureRequestDTO1.getCategorie());
        }
        if (compressBytes(File.getBytes()) != null) {
            voiture.setPhotoVoiture(compressBytes(File.getBytes()));
        }
        if (File.getContentType() != "") {
            voiture.setTypePhotoVoiture(File.getContentType());
        }
        if (voitureRequestDTO1.getNomPhotoVoiture() != "") {
            voiture.setNomPhotoVoiture(voitureRequestDTO1.getNomPhotoVoiture());
        }

        carRepository.save(voiture);
    }

    // compressing and decompressing files
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }

}