package com.cdac.acts.logistics_v1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.acts.logistics_v1.dto.RouteRequestDTO;
import com.cdac.acts.logistics_v1.dto.RouteResponseDTO;
import com.cdac.acts.logistics_v1.service.RouteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin("*")
public class RouteController {

	@Autowired
    private RouteService routeService;

    // Create Route (will call OpenRouteService internally)
    @PostMapping
    public ResponseEntity<RouteResponseDTO> createRoute(@RequestBody RouteRequestDTO requestDTO) {
        RouteResponseDTO createdRoute = routeService.createRoute(requestDTO);
        return ResponseEntity.ok(createdRoute);
    }

    // Get route by ID
    @GetMapping("/{id}")
    public ResponseEntity<RouteResponseDTO> getRouteById(@PathVariable Long id) {
        RouteResponseDTO route = routeService.getRouteById(id);
        return ResponseEntity.ok(route);
    }

    // Get all routes
    @GetMapping
    public ResponseEntity<List<RouteResponseDTO>> getAllRoutes() {
        List<RouteResponseDTO> routes = routeService.getAllRoutes();
        return ResponseEntity.ok(routes);
    }

    // Update route by ID (calls OpenRouteService again with new coordinates)
    @PutMapping("/{id}")
    public ResponseEntity<RouteResponseDTO> updateRoute(@PathVariable Long id, @RequestBody RouteRequestDTO requestDTO) {
        RouteResponseDTO updated = routeService.updateRoute(id, requestDTO);
        return ResponseEntity.ok(updated);
    }

    // Delete route by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoute(@PathVariable Long id) {
        routeService.deleteRoute(id);
        return ResponseEntity.noContent().build();
    }
}

