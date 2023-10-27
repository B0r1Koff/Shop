package com.shop.api.service;

import com.shop.api.dto.ProductDTO;
import com.shop.api.entity.Product;
import com.shop.api.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    public Product create(ProductDTO dto){
        Product product = Product.builder()
                .name(dto.getName())
                .price(dto.getPrice())
                .discount(dto.getDiscount())
                .category(categoryService.readById(dto.getCategoryId()))
                .image(dto.getImage())
                .build();
        return productRepository.save(product);
    }

    public List<Product> readAll(){
        return productRepository.findAll();
    }

    public List<Product> readByCategoryId(Long id){
        return productRepository.findByCategoryId(id);
    }

    public Product update(Product product){
        return productRepository.save(product);
    }

    public void delete(Long id){
        productRepository.deleteById(id);
    }

    public Product readById(Long id){
        return productRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Product not found - " + id));
    }
}
