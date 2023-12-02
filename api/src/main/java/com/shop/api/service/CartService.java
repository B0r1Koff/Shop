package com.shop.api.service;

import com.shop.api.dto.CartDTO;
import com.shop.api.entity.Cart;
import com.shop.api.repository.CartRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductService productService;
    private final UserService userService;

    public Cart create(CartDTO dto){
        Cart cart = Cart.builder()
                .quantity(dto.getQuantity())
                .product(productService.readById(dto.getProductId()))
                .user(userService.readById(dto.getUserId()))
                .build();
        return cartRepository.save(cart);
    }

    public List<Cart> readByUserId(Long id){
        return cartRepository.findByUserId(id);
    }

    public void delete(Long id){
        cartRepository.deleteById(id);
    }

    public Cart update(Cart cart){
        return cartRepository.save(cart);
    }
}
