SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `BD_QuispeGomez` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `BD_QuispeGomez` DEFAULT CHARACTER SET utf8 ;
USE `BD_QuispeGomez` ;

-- -----------------------------------------------------
-- Table `tb_proyecto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_proyecto` ;

CREATE TABLE IF NOT EXISTS `tb_proyecto` (
  `cod_proyecto` INT NOT NULL AUTO_INCREMENT,
  `nom_proyecto` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`cod_proyecto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tb_programador`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tb_programador` ;

CREATE TABLE IF NOT EXISTS `tb_programador` (
  `cod_programador` INT NOT NULL AUTO_INCREMENT,
  `nom_programador` VARCHAR(25) NOT NULL,
  `ape_programador` VARCHAR(25) NOT NULL,
  `dni_programador` INT NOT NULL,
  `num_hijos` INT NOT NULL,
  `sueldo` DOUBLE NOT NULL,
  `cod_proyecto` INT NOT NULL,
  PRIMARY KEY (`cod_programador`),
  INDEX `fk_tb_programador_1_idx` (`cod_proyecto` ASC) VISIBLE,
  CONSTRAINT `fk_tb_programador_1`
    FOREIGN KEY (`cod_proyecto`)
    REFERENCES `tb_proyecto` (`cod_proyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO tb_proyecto(nom_proyecto) VALUES ('Proyecto1'), ("Proyecto2"), ("Proyecto3");

INSERT INTO tb_programador(nom_programador, ape_programador, dni_programador, num_hijos, sueldo, cod_proyecto) 
VALUES 
('Programador 1', 'Apellido 1', 123456789, 2, 34, 1),
('Programador 1', 'Apellido 1', 123456789, 2, 34, 2),
('Programador 1', 'Apellido 1', 123456789, 2, 34, 3),
('Programador 1', 'Apellido 1', 123456789, 2, 34, 1),
('Programador 1', 'Apellido 1', 123456789, 2, 34, 2)