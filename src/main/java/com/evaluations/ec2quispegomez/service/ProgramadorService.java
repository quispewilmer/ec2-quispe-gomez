package com.evaluations.ec2quispegomez.service;

import com.evaluations.ecquispegomez.model.Computadora;
import com.evaluations.ecquispegomez.repository.ComputadoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComputadoraService {
    @Autowired
    private ComputadoraRepository computadoraRepository;

    public List<Computadora> findAll() {
        return computadoraRepository.findAll();
    }

    public Computadora findById(int id) {
        return computadoraRepository.findById(id).orElse(new Computadora());
    }

    public Computadora save(Computadora user) {
        return computadoraRepository.save(user);
    }

    public void deleteById(int id) {
        computadoraRepository.deleteById(id);
    }
}
