package com.example.demo.repository;

import com.example.demo.model.Client;
import com.example.demo.model.Restaurant;
import com.example.demo.model.RestaurantStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByClientUserId(Client clientUserId);
    List<Restaurant> findByStatus(RestaurantStatus status);
    List<Restaurant> findByLocationAndStatus(String location, RestaurantStatus status);
    Restaurant findByNameAndAddress(String name, String address);

    @Modifying
    @Transactional
    @Query("UPDATE Restaurant r SET r.status = ?1 WHERE r.id = ?2")
    int updateStatus(RestaurantStatus status, Long id);
}
