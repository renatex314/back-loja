/*SET GLOBAL log_bin_trust_function_creators = 1;*/

CREATE DATABASE IF NOT EXISTS loja;

USE loja;

CREATE TABLE IF NOT EXISTS cliente(
    cli_id INT PRIMARY KEY AUTO_INCREMENT,
    cli_nome VARCHAR(100),
    cli_email VARCHAR(50) NOT NULL UNIQUE,
    cli_senha_hash VARCHAR(255) NOT NULL,
    cli_cpf CHAR(11) NOT NULL UNIQUE,
    cli_rg CHAR(9),
    cli_dt_nascimento DATE,
    cli_adm BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS marca(
    marca_id INT PRIMARY KEY AUTO_INCREMENT,
    marca_nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS produto(
    prod_id INT PRIMARY KEY AUTO_INCREMENT,
    prod_nome VARCHAR(100),
    prod_descr VARCHAR(500),
    prod_preco DECIMAL(10, 2) NOT NULL,
    marca_id INT,
    prod_qtd_estoque INT NOT NULL,
    CONSTRAINT marca_fk FOREIGN KEY (marca_id) REFERENCES marca(marca_id)
);

CREATE TABLE IF NOT EXISTS metodo_pagamento(
    met_pag_id INT PRIMARY KEY AUTO_INCREMENT,
    met_pag_nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS venda(
    ven_id INT PRIMARY KEY AUTO_INCREMENT,
    ven_dt DATETIME,
    cli_id INT NOT NULL,
    met_pag_id INT NOT NULL,
    CONSTRAINT cli_fk FOREIGN KEY (cli_id) REFERENCES cliente(cli_id),
    CONSTRAINT met_pag_fk FOREIGN KEY (met_pag_id) REFERENCES metodo_pagamento(met_pag_id)
);

CREATE TABLE IF NOT EXISTS venda_items(
    ven_id INT NOT NULL,
    prod_id INT NOT NULL,
    ven_it_qtd INT NOT NULL,
    CONSTRAINT ven_ite_pk PRIMARY KEY (ven_id, prod_id),
    CONSTRAINT ven_fk FOREIGN KEY (ven_id) REFERENCES venda(ven_id),
    CONSTRAINT prod_fk FOREIGN KEY (prod_id) REFERENCES produto(prod_id)
);

DELIMITER $
CREATE TRIGGER tgr_venda_insert_before
BEFORE INSERT ON venda_items
    FOR EACH ROW
    BEGIN
		IF (SELECT prod_qtd_estoque FROM produto WHERE prod_id=NEW.prod_id) < NEW.ven_it_qtd
        THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'A quantidade em estoque é menor do que a requisitada';
        END IF;
    END$
DELIMITER ;

DELIMITER $
CREATE TRIGGER tgr_venda_insert_after
AFTER INSERT ON venda_items
	FOR EACH ROW
	BEGIN 
		UPDATE produto SET prod_qtd_estoque=prod_qtd_estoque-NEW.ven_it_qtd WHERE prod_id=NEW.prod_id;
    END$
DELIMITER ;

CREATE USER IF NOT EXISTS 'aplicacao'@'localhost' IDENTIFIED BY 'Senha123@';
GRANT ALL ON loja.* TO 'aplicacao'@'localhost';