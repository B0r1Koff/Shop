package com.shop.api.controller;

import com.shop.api.dto.CharacteristicDTO;
import com.shop.api.entity.Characteristic;
import com.shop.api.service.CharacteristicService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/characteristic")
@AllArgsConstructor
public class CharacteristicController {

    private final CharacteristicService characteristicService;

    @PostMapping("/create")
    public ResponseEntity<Characteristic> create(@RequestBody CharacteristicDTO dto){
        return new ResponseEntity<>(characteristicService.create(dto), HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<List<Characteristic>> readByProductId(@PathVariable Long id){
        return new ResponseEntity<>(characteristicService.readByProductId(id), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Characteristic> update(@RequestBody Characteristic characteristic){
        return new ResponseEntity<>(characteristicService.update(characteristic), HttpStatus.OK);
    }

    @DeleteMapping("/product/{id}")
    public HttpStatus delete(@PathVariable Long id){
        characteristicService.delete(id);
        return HttpStatus.OK;
    }
}
