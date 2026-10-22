package com.example.tracker;

import jakarta.persistence.*;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String activity;

    @Column(nullable = false)
    private Integer timeSpent;

    @Column(nullable = false, length = 2000)
    private String description;

    protected Activity() {
    }

    public Activity(String activity, Integer timeSpent, String description) {
        this.activity = activity;
        this.timeSpent = timeSpent;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getActivity() {
        return activity;
    }

    public Integer getTimeSpent() {
        return timeSpent;
    }

    public String getDescription() {
        return description;
    }
}