package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@Setter
@Getter
public class Restaurant {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "restaurant_sequence"
    )
    @SequenceGenerator(
            name = "restaurant_sequence",
            sequenceName = "restaurant_sequence",
            allocationSize = 1
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_user_id", referencedColumnName = "id")
    @JsonTypeInfo(use = JsonTypeInfo.Id.NONE)
    private Client clientUserId;

    private String name;
    private String address;
    private String style;
    private String cuisine;
    private int cost;

    @Column(length = 1500)
    private String information;
    private String phone;
    private String openingHours;
    private String location;

    @Enumerated(EnumType.STRING)
    private RestaurantStatus status;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Photo> photos;

    public Restaurant() {
        this.status = RestaurantStatus.PENDING;
    }

}