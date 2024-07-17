package com.example.rentngo.coucheService.ServicesImpl;

import com.example.rentngo.DAO.entites.Voiture;
import com.example.rentngo.DAO.repository.VoitureRepository;
import com.example.rentngo.coucheService.Services.VoitureService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoitureServiceImpl implements VoitureService {
    @Autowired
    private VoitureRepository carRepository;

    @Override
    public List<Voiture> getAllCars() {
        return carRepository.findAll();
    }

    @Override
    public Voiture addCar(Voiture car) {
        return carRepository.save(car);
    }

    @Override
    public Voiture updateCar(Long id, Voiture carDetails) {
        Voiture car = carRepository.findById(id).orElseThrow();
        car.setImmatriculation(carDetails.getImmatriculation());
        car.setMarque(carDetails.getMarque());
        car.setCouleur(carDetails.getCouleur());
        car.setPrix(carDetails.getPrix());
        return carRepository.save(car);
    }

    @Override
    public void deleteCar(Long id) {
        Voiture car = carRepository.findById(id).orElseThrow();
        carRepository.delete(car);
    }

    @SuppressWarnings("deprecation")
    @Override
    public Voiture findCarById(Long id) {
        if (id != null) {
            return carRepository.getById(id);
        }
        return null;
    }
}

/*
 * import org.springframework.beans.factory.annotation.Autowired;
 * import org.springframework.stereotype.Service;
 * import com.example.rentngo.DAO.entites.Voiture;
 * import com.example.rentngo.DAO.repository.VoitureRepository;
 * 
 * 
 * import java.util.List;
 * 
 * @Service
 * public class VoitureService {
 * 
 * @Autowired
 * private VoitureRepository carRepository;
 * 
 * public List<Voiture> getAllCars() {
 * return carRepository.findAll();
 * }
 * 
 * public Voiture addCar(Voiture car) {
 * return carRepository.save(car);
 * }
 * 
 * public Voiture updateCar(Long id, Voiture carDetails) {
 * Voiture car = carRepository.findById(id).orElseThrow();
 * car.setImmatriculation(carDetails.getImmatriculation());
 * car.setMarque(carDetails.getMarque());
 * //car.setPrix(carDetails.getPrix());
 * car.setCouleur(carDetails.getCouleur());
 * // car.setDateMiseEnCirculation(carDetails.getDateMiseEnCirculation());
 * car.setPrixLocation(carDetails.getPrixLocation());
 * 
 * return carRepository.save(car);
 * }
 * 
 * public void deleteCar(Long id) {
 * Voiture car = carRepository.findById(id).orElseThrow();
 * carRepository.delete(car);
 * }
 * }
 */