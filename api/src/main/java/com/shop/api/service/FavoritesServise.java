package com.shop.api.service;

import com.shop.api.dto.FavoritesDTO;
import com.shop.api.entity.Favorites;
import com.shop.api.repository.FavoritesRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FavoritesServise {

    private final FavoritesRepository favoritesRepository;
    private final ProductService productService;
    private final UserService userService;

    public Favorites create(FavoritesDTO dto){
        Favorites favorites = Favorites.builder()
                .product(productService.readById(dto.getProductId()))
                .user(userService.readById(dto.getUserId()))
                .build();
        return favoritesRepository.save(favorites);
    }

    public List<Favorites> readByUserId(Long id){
        return favoritesRepository.findByUserId(id);
    }

    public void delete(Long id){
        favoritesRepository.deleteById(id);
    }
}
