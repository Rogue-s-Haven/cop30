package com.cop30.cop30.repository;

import com.cop30.cop30.model.Coordenador;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoordenadorRepository extends MongoRepository<Coordenador, String> {
    // Caso precise, métodos personalizados podem ser adicionados aqui
}
