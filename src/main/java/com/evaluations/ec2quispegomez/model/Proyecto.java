package com.evaluations.ec2quispegomez.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "marca")
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo")
    private Integer codigo;

    @Column(name = "nombre")
    private String nombre;

    @JsonIgnore
    @OneToMany(mappedBy="marca")
    private List<Computadora> computadoraList;

    public Integer getCodigo() {
        return codigo;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Computadora> getComputadoraList() {
        return computadoraList;
    }

    public void setComputadoraList(List<Computadora> computadoraList) {
        this.computadoraList = computadoraList;
    }
}
