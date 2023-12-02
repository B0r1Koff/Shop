package com.shop.api.utils;

import com.shop.api.entity.Category;
import com.shop.api.entity.Product;

import lombok.Data;
import org.springframework.http.HttpEntity;

@Data
public class ProductResponce {

    private Long id;
    private String name;
    private double price;
    private double discount;

    private HttpEntity<byte[]> image;

    private Category category;

    public ProductResponce(Product product, HttpEntity<byte[]> image){
        this.id = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.discount = product.getDiscount();
        this.image = image;
        this.category = product.getCategory();
    }
}
