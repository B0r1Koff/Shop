package com.shop.api.controller;

import com.shop.api.dto.ProductDTO;
import com.shop.api.entity.Product;
import com.shop.api.service.ProductService;
import com.shop.api.utils.ProductResponce;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/product")
@AllArgsConstructor
public class ProductController {

    private final ProductService productService;

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PostMapping("/create")
    public ResponseEntity<Product> create(@ModelAttribute ProductDTO dto) throws IOException {
        return new ResponseEntity<>(productService.create(dto), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping("/readAll")
    public ResponseEntity<List<ProductResponce>> readAll(){
        return new ResponseEntity<>(productService.readAll(), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping("/category/{id}")
    public ResponseEntity<List<Product>> readByCategoryId(@PathVariable Long id){
        return new ResponseEntity<>(productService.readByCategoryId(id), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PutMapping("/update")
    public ResponseEntity<Product> update(@RequestBody ProductDTO product) throws IOException {
        return new ResponseEntity<>(productService.update(product), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @DeleteMapping("/{id}")
    public HttpStatus delete(@PathVariable Long id){
        productService.delete(id);
        return HttpStatus.OK;
    }
}
