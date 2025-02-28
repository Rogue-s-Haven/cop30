package com.cop30.cop30.controller;

import com.cop30.cop30.model.Coordenador;
import com.cop30.cop30.service.CoordenadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/coordenadores")
public class CoordenadorController {

    @Autowired
    private CoordenadorService coordenadorService;

    // GET all coordenadores
    @GetMapping
    public List<Coordenador> getAllCoordenadores() {
        return coordenadorService.getAllCoordenadores();
    }

    // GET coordenador by id
    @GetMapping("/{id}")
    public ResponseEntity<Coordenador> getCoordenadorById(@PathVariable String id) {
        Optional<Coordenador> coordenador = coordenadorService.getCoordenadorById(id);
        return coordenador.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
public ResponseEntity<Coordenador> createCoordenador(@RequestBody Coordenador coordenador) {
    Coordenador createdCoordenador = coordenadorService.createCoordenador(coordenador);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdCoordenador);
}

    // PUT update coordenador by id
    @PutMapping("/{id}")
    public ResponseEntity<Coordenador> updateCoordenador(@PathVariable String id, @RequestBody Coordenador coordenador) {
        Coordenador updatedCoordenador = coordenadorService.updateCoordenador(id, coordenador);
        return updatedCoordenador != null
                ? ResponseEntity.ok(updatedCoordenador)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // DELETE coordenador by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoordenador(@PathVariable String id) {
        boolean deleted = coordenadorService.deleteCoordenador(id);
        return deleted
                ? ResponseEntity.status(HttpStatus.NO_CONTENT).build()
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
