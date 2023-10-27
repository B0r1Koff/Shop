package com.shop.api.dto;

import lombok.Data;

@Data
public class CharacteristicDTO {
    private String name;
    private String value;
    private Long productId;
}