package com.shop.api.controller;

import com.shop.api.dto.OrdersDTO;
import com.shop.api.entity.Orders;
import com.shop.api.service.OrdersService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@AllArgsConstructor
public class OrdersController {

    private final OrdersService orderService;

    @PostMapping("/create")
    public ResponseEntity<Orders> create(@RequestBody OrdersDTO dto){
        return new ResponseEntity<>(orderService.create(dto), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<List<Orders>> readByUserId(@PathVariable Long id){
        return new ResponseEntity<>(orderService.readByUserId(id), HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Orders>> findAll(){
        return new ResponseEntity<>(orderService.findAll(), HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/delete/{number}")
    public ResponseEntity<Void> delete(@PathVariable int number){
        orderService.deleteByNumber(number);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/update")
    public ResponseEntity<Orders> update(@RequestBody Orders order){
        return new ResponseEntity<>(orderService.update(order), HttpStatus.OK);
    }
}
