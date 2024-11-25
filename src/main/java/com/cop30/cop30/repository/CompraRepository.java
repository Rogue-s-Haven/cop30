package com.cop30.cop30.repository;

import com.cop30.cop30.model.Compra;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CompraRepository extends MongoRepository<Compra, String> {

}