package com.evaluations.ec2quispegomez.controller;

import com.evaluations.ec2quispegomez.model.Proyecto;
import com.evaluations.ec2quispegomez.service.ProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "/api/proyecto")
public class ProyectoApiController {
    @Autowired
    private ProyectoService proyectoService;

    @ResponseBody
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Proyecto> findAll() {
        return proyectoService.findAll();
    }
}
