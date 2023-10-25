package com.shop.api.dto;

import jakarta.persistence.Lob;
import lombok.Data;

@Data
public class ProductDTO {
    private String name;
    private double price;
    private double discount;
    private Long categoryId;

    @Lob
    private byte[] image;
}