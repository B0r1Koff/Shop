package com.shop.api.controller;

import com.shop.api.dto.CartDTO;
import com.shop.api.entity.Cart;
import com.shop.api.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@AllArgsConstructor
public class CartController {

    private final CartService cartService;

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PostMapping("/create")
    public ResponseEntity<Cart> create(@RequestBody CartDTO dto){
        return new ResponseEntity<>(cartService.create(dto), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping("/users/{id}")
    public ResponseEntity<List<Cart>> readByUserId(@PathVariable Long id){
        return new ResponseEntity<>(cartService.readByUserId(id), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PostMapping("/delete/{id}")
    public HttpStatus delete(@PathVariable Long id){
        cartService.delete(id);
        return HttpStatus.OK;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PostMapping("/update")
    public ResponseEntity<Cart> update(@RequestBody Cart cart){
        return new ResponseEntity<>(cartService.update(cart), HttpStatus.OK);
    }
}
