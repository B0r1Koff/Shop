package com.shop.api.dto;

import lombok.Data;

@Data
public class ReviewDTO {
    private String text;
    private double grade;
    private Long productId;
    private Long userId;
}
