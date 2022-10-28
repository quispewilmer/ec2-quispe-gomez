package com.evaluations.ec2quispegomez.controller;

import com.evaluations.ecquispegomez.model.Computadora;
import com.evaluations.ecquispegomez.service.ComputadoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping(value = "/computadora", method = RequestMethod.GET)
public class ComputadoraController {
    @Autowired
    private ComputadoraService computadoraService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Model model) {
        List<Computadora> computadoraList = computadoraService.findAll();

        model.addAttribute("computadoraList", computadoraList);

        return "computadora/index";
    }
}
