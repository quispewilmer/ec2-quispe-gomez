package com.evaluations.ec2quispegomez.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.List;

@Entity
@Table(name = "tb_proyecto")
@Getter
@Setter
@NoArgsConstructor
public class Proyecto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_proyecto")
    private BigInteger codigo;

    @Column(name = "nom_proyecto")
    private String nombre;

    @JsonIgnore
    @OneToMany(mappedBy="proyecto")
    private List<Programador> programadorList;
}
