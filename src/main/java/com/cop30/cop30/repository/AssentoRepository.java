package com.cop30.cop30.repository;

import com.cop30.cop30.model.Assento;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssentoRepository extends MongoRepository<Assento, String> {
    // Consulta personalizada para buscar assentos pela placa do ônibus
    List<Assento> findByOnibusPlaca(String onibusPlaca);
    List<Assento> findByNumeroAssento(Integer numeroAssento);

    Optional<Assento> findByOnibusPlacaAndNumeroAssento(String onibusPlaca, int numeroAssento);
}
