package com.shop.api.controller;

import com.shop.api.dto.FavoritesDTO;
import com.shop.api.dto.ReviewDTO;
import com.shop.api.entity.Favorites;
import com.shop.api.entity.Review;
import com.shop.api.service.FavoritesServise;
import com.shop.api.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
@AllArgsConstructor
public class FavoritesController {

    private final FavoritesServise favoritesServise;

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PostMapping("/create")
    public ResponseEntity<Favorites> create(@RequestBody FavoritesDTO dto){
        return new ResponseEntity<>(favoritesServise.create(dto), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping("/users/{id}")
    public ResponseEntity<List<Favorites>> readByUserId(@PathVariable Long id){
        return new ResponseEntity<>(favoritesServise.readByUserId(id), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PostMapping("/delete/{id}")
    public HttpStatus delete(@PathVariable Long id){
        favoritesServise.delete(id);
        return HttpStatus.OK;
    }
}
