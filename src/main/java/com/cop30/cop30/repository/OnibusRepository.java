package com.cop30.cop30.repository;

import com.cop30.cop30.model.Onibus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnibusRepository extends MongoRepository<Onibus, String> {
    Onibus findByPlaca(String placa);
}
