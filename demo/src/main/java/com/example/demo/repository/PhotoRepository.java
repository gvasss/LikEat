package com.example.demo.repository;

import com.example.demo.model.Photo;
import com.example.demo.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
    List<Photo> findByRestaurantId(Long restaurantId);
    List<Photo> findByRestaurantAndIsMain(Restaurant restaurant, boolean isMain);
    List<Photo> findByRestaurantIdAndIsMain(Long restaurantId, boolean isMain);
}
