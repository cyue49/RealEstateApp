package com.example.backend.controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import com.example.backend.services.MonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/monitor")
public class MonitorController {

    private final MonitorService monitorService;

    @Autowired
    public MonitorController(MonitorService monitorService) {
        this.monitorService = monitorService;
    }


    @PostMapping("/add")
    public ResponseEntity<String> addListingToMonitor(@RequestParam String userId, @RequestParam String listingId) {
        try {
            monitorService.addListingToMonitor(userId, listingId);
            return ResponseEntity.ok("Listing added to monitor successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding listing to monitor: " + e.getMessage());
        }
    }


    @DeleteMapping("/remove")
    public ResponseEntity<String> removeListingFromMonitor(@RequestParam String userId, @RequestParam String listingId) {
        try {
            monitorService.removeListingFromMonitor(userId, listingId);
            return ResponseEntity.ok("Listing removed from monitor successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error removing listing from monitor: " + e.getMessage());
        }
    }
@GetMapping("/isLiked")
public ResponseEntity<Map<String, Boolean>> isListingLiked(
    @RequestParam String userId,
    @RequestParam String id) {
    // Validate request parameters
    if (userId == null || userId.isEmpty() || id == null || id.isEmpty()) {
        return ResponseEntity.badRequest().body(Collections.singletonMap("error", true)); // Return 400 for missing params
    }

    try {
        // Log parameters for debugging
        System.out.println("Received request with userId: " + userId + ", listingId: " + id);

        boolean isLiked = monitorService.isListingLiked(userId, id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isLiked", isLiked);
        System.out.println("Response: " + response);
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        // Log the exception for debugging
        System.err.println("Error checking liked status: " + e.getMessage());
        return ResponseEntity.status(500).body(null); // Internal Server Error
    }
}


@GetMapping("/getAll")
public ResponseEntity<List<String>> getMonitoredListings(@RequestParam String userId) {
    try {
        List<String> monitoredListings = monitorService.getMonitoredListings(userId);
        return ResponseEntity.ok(monitoredListings);
    } catch (Exception e) {
        return ResponseEntity.status(500).body(null);
    }
}


}
