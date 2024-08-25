package com.example.rentngo.coucheService.ServicesImpl;

import com.example.rentngo.DAO.entites.Voiture;
import com.example.rentngo.DAO.repository.VoitureRepository;
import com.example.rentngo.coucheService.Services.VoitureService;
import com.example.rentngo.coucheWeb.DTO.VoitureRequestDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Random;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@AllArgsConstructor
@Service
@Slf4j
@Transactional
public class VoitureServiceImpl implements VoitureService {
    private final VoitureRepository carRepository;
    private final ObjectMapper objectMapper;

    @Override
    public List<Voiture> getAllCars() {
        log.info("List of cars------------------------");
        return carRepository.findAll();
    }

    @Override
    public void addCar(VoitureRequestDTO voitureRequestDTO, MultipartFile file) throws IOException {
        Voiture voiture = new Voiture();
        voiture.setImmatriculation(voitureRequestDTO.getImmatriculation());
        voiture.setMarque(voitureRequestDTO.getMarque());
        voiture.setPrix(voitureRequestDTO.getPrix());
        voiture.setCouleur(voitureRequestDTO.getCouleur());
        voiture.setCategorie(voitureRequestDTO.getCategorie());
        voiture.setGarantie(voitureRequestDTO.getGarantie());
        voiture.setEstDisponible(true);
        voiture.setTypePhotoVoiture("voiture");
        voiture.setNomPhotoVoiture(file.getOriginalFilename());
        voiture.setPhotoVoiture(file.getBytes()); // Compression
        // log.info("Added new taswira: {}", file.getBytes());
        carRepository.save(voiture);
        log.info("Added new car: {}", voiture);
    }

    @Override
    public Voiture findCarById(Long id) {
        return carRepository.findById(id).orElseThrow(() -> new RuntimeException("Voiture not found"));
    }

    @Override
    public void updateCar(VoitureRequestDTO voitureRequestDTO1, MultipartFile file, Long id) throws IOException {
        Voiture voiture = carRepository.findById(id).orElse(null);
        if (voiture != null) {
            // VoitureRequestDTO voitureRequestDTO1 = objectMapper.readValue(voitureRequestDTO, VoitureRequestDTO.class);
            if (voitureRequestDTO1.getGarantie() != null) {
                voiture.setGarantie(voitureRequestDTO1.getGarantie());
            }
            if (voitureRequestDTO1.getImmatriculation() != null && !voitureRequestDTO1.getImmatriculation().isEmpty()) {
                voiture.setImmatriculation(voitureRequestDTO1.getImmatriculation());
            }
            if (voitureRequestDTO1.getMarque() != null && !voitureRequestDTO1.getMarque().isEmpty()) {
                voiture.setMarque(voitureRequestDTO1.getMarque());
            }
            if (voitureRequestDTO1.getPrix() != null) {
                voiture.setPrix(voitureRequestDTO1.getPrix());
            }
            if (voitureRequestDTO1.getCouleur() != null && !voitureRequestDTO1.getCouleur().isEmpty()) {
                voiture.setCouleur(voitureRequestDTO1.getCouleur());
            }
            if (voitureRequestDTO1.getCategorie() != null && !voitureRequestDTO1.getCategorie().isEmpty()) {
                voiture.setCategorie(voitureRequestDTO1.getCategorie());
            }
            if (file != null && !file.isEmpty()) {
                voiture.setPhotoVoiture(file.getBytes()); // Compression si nécessaire
                voiture.setTypePhotoVoiture(file.getContentType());
                voiture.setNomPhotoVoiture(file.getOriginalFilename());
            }
            carRepository.save(voiture);
            log.info("Updated car with id: {} done!", id);
        } else {
            log.warn("Attempted to update a car with id: {} that does not exist", id);
        }
    }

    @Override
    public void deleteCar(Long id) {
        Voiture car = carRepository.findById(id).orElse(null);
        if (car != null) {
            carRepository.delete(car);
            log.info("Deleted car with id: {}---------------------------", id);
        } else {
            log.warn("Attempted to delete a car with id: {} that does not exist----------------------", id);
        }
    }

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
        System.out.println("Compressed Image Byte Size - ******************************" + outputStream.toByteArray().length);

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

    public static String RandomCodeGenerator() {
        Random random = new Random();
        int code = random.nextInt(100000);
        String codeStr = String.format("%05d", code);
        return codeStr;
    }
}
