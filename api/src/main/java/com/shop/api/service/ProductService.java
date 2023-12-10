package com.shop.api.service;

import com.shop.api.dto.ProductDTO;
import com.shop.api.entity.Product;
import com.shop.api.repository.CategoryRepository;
import com.shop.api.repository.ProductRepository;
import com.shop.api.utils.ProductResponce;
import com.shop.api.utils.ProjectConstants;
import com.shop.api.utils.ProjectFileCR;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepo;

    public Product create(ProductDTO dto) throws IOException {
        String fileName = UUID.randomUUID().toString() + "jpg";

        new File(ProjectConstants.PRODUCT_IMAGE_PATH).mkdir();

        ProjectFileCR.writeFile(fileName, ProjectConstants.PRODUCT_IMAGE_PATH, dto.getImage());

        return productRepository.save(Product.builder()
                .name(dto.getName())
                .category(categoryRepo.findById(dto.getCategoryId()).get())
                .discount(dto.getDiscount())
                .price(dto.getPrice())
                .imageName(fileName)
                .build());
    }

    public List<ProductResponce> readAll(){

        List<Product> products = productRepository.findAll();

        List<ProductResponce> responce = new ArrayList<>();

        for(Product product : products){
            HttpEntity<byte[]> entity = ProjectFileCR.readImage(product.getImageName(), ProjectConstants.PRODUCT_IMAGE_PATH);
            responce.add(new ProductResponce(product, entity));
        }

        return responce;
    }

    public List<ProductResponce> readByCategoryId(Long id){

        List<Product> products = productRepository.findByCategoryId(id);

        List<ProductResponce> responce = new ArrayList<>();

        for(Product product : products){
            HttpEntity<byte[]> entity = ProjectFileCR.readImage(product.getImageName(), ProjectConstants.PRODUCT_IMAGE_PATH);
            responce.add(new ProductResponce(product, entity));
        }

        return responce;
    }

    public Product update(ProductDTO dto) throws IOException {

        Product product = productRepository.getReferenceById(dto.getId());
        if(dto.getName() != null){product.setName(dto.getName());}
        if(dto.getImage() != null){ProjectFileCR.writeFile(product.getImageName(), ProjectConstants.PRODUCT_IMAGE_PATH, dto.getImage(), true);}

        return productRepository.save(product);
    }

    public void delete(Long id){
        productRepository.deleteById(id);
    }

    public Product readById(Long id){
        return productRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Product not found - " + id));
    }

    public List<ProductResponce> getById(Long id){
        List<Product> products = productRepository.findAllById(Collections.singleton(id));

        List<ProductResponce> responce = new ArrayList<>();

        for(Product product : products){
            HttpEntity<byte[]> entity = ProjectFileCR.readImage(product.getImageName(), ProjectConstants.PRODUCT_IMAGE_PATH);
            responce.add(new ProductResponce(product, entity));
        }

        return responce;
    }

}
