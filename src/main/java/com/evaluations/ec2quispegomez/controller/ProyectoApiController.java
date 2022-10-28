package com.evaluations.ec2quispegomez.controller;

import com.evaluations.ecquispegomez.model.Marca;
import com.evaluations.ecquispegomez.service.MarcaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "/api")
public class MarcaApiController {
    @Autowired
    private MarcaService marcaService;

    @ResponseBody
    @RequestMapping(value = "/marca/", method = RequestMethod.GET)
    public List<Marca> findAll() {
        return marcaService.findAll();
    }
}
