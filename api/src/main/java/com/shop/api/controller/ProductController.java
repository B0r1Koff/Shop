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

    @PostMapping("/create")
    public ResponseEntity<Product> create(@ModelAttribute ProductDTO dto) throws IOException {
        return new ResponseEntity<>(productService.create(dto), HttpStatus.OK);
    }

    @GetMapping("/readAll")
    public ResponseEntity<List<ProductResponce>> readAll(){
        return new ResponseEntity<>(productService.readAll(), HttpStatus.OK);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<List<Product>> readByCategoryId(@PathVariable Long id){
        return new ResponseEntity<>(productService.readByCategoryId(id), HttpStatus.OK);
    }

//    @PutMapping("/update")
//    public ResponseEntity<Product> update(@RequestBody Product product){
//        return new ResponseEntity<>(productService.update(product), HttpStatus.OK);
//    }

    @DeleteMapping("/{id}")
    public HttpStatus delete(@PathVariable Long id){
        productService.delete(id);
        return HttpStatus.OK;
    }
}
