package com.evaluations.ec2quispegomez.controller;

import com.evaluations.ec2quispegomez.model.Programador;
import com.evaluations.ec2quispegomez.service.ProgramadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@Controller
@RequestMapping(value = "/api/programador")
public class ProgramadorApiController {
    @Autowired
    private ProgramadorService programadorService;

    @ResponseBody
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Programador> findAll() {
        return programadorService.findAll();
    }

    @ResponseBody
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Programador findById(@PathVariable("id") BigInteger id) {
        return programadorService.findById(id);
    }

    @ResponseBody
    @RequestMapping(value = "/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Programador save(@RequestBody Programador computadora) {
        return programadorService.save(computadora);
    }

    @ResponseBody
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteById(@PathVariable("id") BigInteger id) {
        programadorService.deleteById(id);
    }
}
