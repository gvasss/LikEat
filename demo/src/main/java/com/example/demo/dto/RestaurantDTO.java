package com.example.demo.dto;

import com.example.demo.model.RestaurantStatus;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RestaurantDTO {

    private Long clientUserId;
    private String name;
    private String address;
    private String style;
    private String cuisine;
    private int cost;
    private String information;
    private String phone;
    private String openingHours;
    private String location;
    private RestaurantStatus status;
}
