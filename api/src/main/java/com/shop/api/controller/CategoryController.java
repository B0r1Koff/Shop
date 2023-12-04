package com.shop.api.controller;

import com.shop.api.dto.CategoryDTO;
import com.shop.api.dto.ProductDTO;
import com.shop.api.dto.UserDTO;
import com.shop.api.entity.Category;
import com.shop.api.entity.Product;
import com.shop.api.entity.Users;
import com.shop.api.service.CategoryService;
import com.shop.api.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PostMapping("/create")
    public ResponseEntity<Category> create(@RequestBody CategoryDTO dto){
        return new ResponseEntity<>(categoryService.create(dto), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping("/readAll")
    public ResponseEntity<List<Category>> readAll(){
        return new ResponseEntity<>(categoryService.readAll(), HttpStatus.OK);
    }
}
