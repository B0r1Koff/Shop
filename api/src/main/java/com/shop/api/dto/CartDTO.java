package com.shop.api.dto;

import lombok.Data;

@Data
public class CartDTO {
    private int quantity;
    private Long userId;
    private Long productId;
}
