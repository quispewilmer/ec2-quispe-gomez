package com.evaluations.ec2quispegomez.service;

import com.evaluations.ec2quispegomez.model.Proyecto;
import com.evaluations.ec2quispegomez.repository.ProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProyectoService {
    @Autowired
    private ProyectoRepository proyectoRepository;

    public List<Proyecto> findAll() {
        return proyectoRepository.findAll();
    }

}
