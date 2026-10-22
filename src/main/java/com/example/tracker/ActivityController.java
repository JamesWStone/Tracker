package com.example.tracker;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityRepository repository;

    public ActivityController(ActivityRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Activity> getActivities() {
        return repository.findAllByOrderByIdDesc();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Activity addActivity(
            @Valid @RequestBody CreateActivityRequest request) {

        Activity activity = new Activity(
                request.activity().trim(),
                request.timeSpent(),
                request.description().trim()
        );

        return repository.save(activity);
    }

    public record CreateActivityRequest(
            @NotBlank @Size(max = 255) String activity,
            @NotNull @Positive Integer timeSpent,
            @NotBlank @Size(max = 2000) String description
    ) {
    }
}