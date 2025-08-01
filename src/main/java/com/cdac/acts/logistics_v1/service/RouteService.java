package com.cdac.acts.logistics_v1.service;

import java.util.List;

import com.cdac.acts.logistics_v1.dto.RouteRequestDTO;
import com.cdac.acts.logistics_v1.dto.RouteResponseDTO;

public interface RouteService {
    RouteResponseDTO createRoute(RouteRequestDTO request);
    RouteResponseDTO getRouteById(Long id);
    List<RouteResponseDTO> getAllRoutes();
    RouteResponseDTO updateRoute(Long id, RouteRequestDTO request);
    void deleteRoute(Long id);

    // Extra
<<<<<<< HEAD
    RouteResponseDTO fetchAndSaveRouteDetails(Double srcLat, Double srcLng, Double dstLat, Double dstLng);
=======
    RouteResponseDTO fetchAndSaveRouteDetails(String srcLat, String srcLng, String dstLat, String dstLng);
>>>>>>> main
}

