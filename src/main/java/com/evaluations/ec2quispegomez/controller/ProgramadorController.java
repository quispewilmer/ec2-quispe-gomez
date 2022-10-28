package com.evaluations.ec2quispegomez.controller;

import com.evaluations.ec2quispegomez.model.Programador;
import com.evaluations.ec2quispegomez.service.ProgramadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping(value = "/programador", method = RequestMethod.GET)
public class ProgramadorController {
    @Autowired
    private ProgramadorService programadorService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Model model) {
        List<Programador> programadorList = programadorService.findAll();

        model.addAttribute("programadorList", programadorList);

        return "programador/index";
    }
}
