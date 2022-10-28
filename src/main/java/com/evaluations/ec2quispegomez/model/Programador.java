package com.evaluations.ec2quispegomez.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.BigInteger;

@Entity
@Table(name = "tb_programador")
@Getter
@Setter
@NoArgsConstructor
public class Programador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_programador")
    private BigInteger codigo;

    @Column(name = "nom_programador")
    private String nombre;

    @Column(name = "ape_programador")
    private String apellido;

    @Column(name = "dni_programador")
    private BigInteger dni;

    @Column(name = "num_hijos")
    private BigInteger hijos;

    @Column(name = "sueldo")
    private BigDecimal sueldo;

    @ManyToOne
    @JoinColumn(name = "cod_proyecto")
    private Proyecto proyecto;
}
