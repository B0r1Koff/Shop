package com.shop.api.service;

import com.shop.api.dto.OrdersDTO;
import com.shop.api.entity.Orders;
import com.shop.api.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OrdersService {

    private final OrderRepository orderRepository;
    private final ProductService productService;
    private final UserService userService;

    public Orders create(OrdersDTO dto){
        Orders order = Orders.builder()
                .quantity(dto.getQuantity())
                .number(dto.getNumber())
                .status(dto.getStatus())
                .cost(dto.getCost())
                .product(productService.readById(dto.getProductId()))
                .user(userService.readById(dto.getUserId()))
                .build();
        return orderRepository.save(order);
    }

    public List<Orders> readByUserId(Long id){
        return orderRepository.findByUserId(id);
    }

    public void deleteByNumber(int number){
        orderRepository.deleteByNumber(number);
    }

    public List<Orders> findAll(){ return orderRepository.findAll(); }

    public Orders update(Orders order){
        return orderRepository.save(order);
    }
}