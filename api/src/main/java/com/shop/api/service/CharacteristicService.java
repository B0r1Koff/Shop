package com.shop.api.service;

import com.shop.api.dto.CharacteristicDTO;
import com.shop.api.entity.Characteristic;
import com.shop.api.repository.CharacteristicRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CharacteristicService {

    private final CharacteristicRepository characteristicRepository;
    private final ProductService productService;

    public Characteristic create(CharacteristicDTO dto){
        Characteristic characteristic = Characteristic.builder()
                .name(dto.getName())
                .value(dto.getValue())
                .product(productService.readById(dto.getProductId()))
                .build();
        return characteristicRepository.save(characteristic);
    }

    public List<Characteristic> readByProductId(Long id){
        return characteristicRepository.findByProductId(id);
    }

    public Characteristic update(Characteristic characteristic){
        return characteristicRepository.save(characteristic);
    }

    public void delete(Long id){
        characteristicRepository.deleteById(id);
    }
}
