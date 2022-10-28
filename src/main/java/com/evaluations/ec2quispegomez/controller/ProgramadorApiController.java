package com.evaluations.ec2quispegomez.controller;

import com.evaluations.ecquispegomez.model.Computadora;
import com.evaluations.ecquispegomez.service.ComputadoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/api")
public class ComputadoraApiController {
    @Autowired
    private ComputadoraService computadoraService;

    @ResponseBody
    @RequestMapping(value = "/computadora/", method = RequestMethod.GET)
    public List<Computadora> findAll() {
        return computadoraService.findAll();
    }

    @ResponseBody
    @RequestMapping(value = "/computadora/{id}", method = RequestMethod.GET)
    public Computadora findById(@PathVariable("id") Integer id) {
        return computadoraService.findById(id);
    }

    @ResponseBody
    @RequestMapping(value = "/computadora/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Computadora save(@RequestBody Computadora computadora) {
        return computadoraService.save(computadora);
    }

    @ResponseBody
    @RequestMapping(value = "/computadora/{id}", method = RequestMethod.DELETE)
    public void deleteById(@PathVariable("id") Integer id) {
        computadoraService.deleteById(id);
    }
}
