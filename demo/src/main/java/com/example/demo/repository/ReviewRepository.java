package com.example.demo.repository;

import com.example.demo.model.Customer;
import com.example.demo.model.Restaurant;
import com.example.demo.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByCustomerUserId(Customer customerUserId);
    List<Review> findByRestaurantId(Restaurant restaurantId);
}
