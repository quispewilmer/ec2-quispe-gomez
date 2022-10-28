package com.evaluations.ec2quispegomez.service;

import com.evaluations.ecquispegomez.model.Marca;
import com.evaluations.ecquispegomez.repository.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarcaService {
    @Autowired
    private MarcaRepository marcaRepository;

    public List<Marca> findAll() {
        return marcaRepository.findAll();
    }

}
