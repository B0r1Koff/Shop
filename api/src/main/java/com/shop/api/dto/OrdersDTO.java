package com.shop.api.dto;

import lombok.Data;

@Data
public class OrdersDTO {
    private int quantity;
    private int number;
    private String status;
    private double cost;
    private Long userId;
    private Long productId;
}
