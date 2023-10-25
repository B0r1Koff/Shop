package com.shop.api.dto;

import lombok.Data;

@Data
public class UserDTO {
    private String email;
    private String password;
    private String role;
}
