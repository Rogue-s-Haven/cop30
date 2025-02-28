package com.cop30.cop30.service;

import com.cop30.cop30.model.Onibus;
import com.cop30.cop30.repository.OnibusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OnibusService {

    @Autowired
    private OnibusRepository onibusRepository;

    // Cria um novo ônibus
    public Onibus createOnibus(Onibus onibus) {
        return onibusRepository.save(onibus);
    }

    // Retorna todos os ônibus
    public List<Onibus> getAllOnibus() {
        return onibusRepository.findAll();
    }

    // Busca um ônibus pelo ID
    public Optional<Onibus> getOnibusById(String id) {
        return onibusRepository.findById(id);
    }

    // Atualiza um ônibus existente
    public Optional<Onibus> updateOnibus(String id, Onibus onibusDetails) {
        return onibusRepository.findById(id).map(onibus -> {
            onibus.setNome(onibusDetails.getNome());
            return onibusRepository.save(onibus);
        });
    }

    // Exclui um ônibus pelo ID
    public boolean deleteOnibus(String id) {
        if (onibusRepository.existsById(id)) {
            onibusRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
