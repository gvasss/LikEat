package com.example.demo.service;

import java.awt.*;

import com.example.demo.model.Restaurant;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface RestaurantService {
    public Restaurant create(Restaurant restaurant);
    public List<Restaurant> viewAll();
    public Restaurant viewById(long id);
}
