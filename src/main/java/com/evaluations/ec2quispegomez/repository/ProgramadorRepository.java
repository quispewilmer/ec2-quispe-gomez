package com.evaluations.ec2quispegomez.repository;

import com.evaluations.ec2quispegomez.model.Programador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface ProgramadorRepository extends JpaRepository<Programador, BigInteger> {
}
