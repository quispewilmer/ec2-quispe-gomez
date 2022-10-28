package com.evaluations.ec2quispegomez.service;

import com.evaluations.ec2quispegomez.model.Programador;
import com.evaluations.ec2quispegomez.repository.ProgramadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@Service
public class ProgramadorService {
    @Autowired
    private ProgramadorRepository programadorRepository;

    public List<Programador> findAll() {
        return programadorRepository.findAll();
    }

    public Programador findById(BigInteger id) {
        return programadorRepository.findById(id).orElse(new Programador());
    }

    public Programador save(Programador user) {
        return programadorRepository.save(user);
    }

    public void deleteById(BigInteger id) {
        programadorRepository.deleteById(id);
    }
}
