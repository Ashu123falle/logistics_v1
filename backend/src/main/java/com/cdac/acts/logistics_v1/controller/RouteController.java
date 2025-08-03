package com.cdac.acts.logistics_v1.controller;

import com.cdac.acts.logistics_v1.dto.RouteRequestDTO;
import com.cdac.acts.logistics_v1.dto.RouteResponseDTO;
import com.cdac.acts.logistics_v1.service.RouteService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin("*")
@RequiredArgsConstructor  // ✅ Constructor Injection (Best Practice)
public class RouteController {

    private final RouteService routeService;

    // ✅ Create Route (will call OpenRouteService internally)
    @PostMapping
    public ResponseEntity<RouteResponseDTO> createRoute(@RequestBody RouteRequestDTO requestDTO) {
        RouteResponseDTO createdRoute = routeService.createRoute(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRoute); // 201 Created
    }

    // ✅ Get route by ID
    @GetMapping("/{id}")
    public ResponseEntity<RouteResponseDTO> getRouteById(@PathVariable Long id) {
        RouteResponseDTO route = routeService.getRouteById(id);
        if (route != null) {
            return ResponseEntity.ok(route);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 if not found
        }
    }

    // ✅ Get all routes
    @GetMapping
    public ResponseEntity<List<RouteResponseDTO>> getAllRoutes() {
        List<RouteResponseDTO> routes = routeService.getAllRoutes();
        return ResponseEntity.ok(routes);
    }

    // ✅ Update route by ID (calls OpenRouteService again with new coordinates)
    @PutMapping("/{id}")
    public ResponseEntity<RouteResponseDTO> updateRoute(@PathVariable Long id, @RequestBody RouteRequestDTO requestDTO) {
        RouteResponseDTO updatedRoute = routeService.updateRoute(id, requestDTO);
        if (updatedRoute != null) {
            return ResponseEntity.ok(updatedRoute);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 if not found
        }
    }

    // ✅ Delete route by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoute(@PathVariable Long id) {
        boolean deleted = routeService.deleteRoute(id);
        if (deleted) {
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 if not found
        }
    }
}
