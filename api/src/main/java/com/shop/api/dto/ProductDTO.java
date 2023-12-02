package com.shop.api.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProductDTO {
    private  Long id;
    private String name;
    private double price;
    private double discount;
    private Long categoryId;
    private MultipartFile image;
}