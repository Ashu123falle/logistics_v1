package com.cdac.acts.logistics_v1.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.cdac.acts.logistics_v1.dto.RouteRequestDTO;
import com.cdac.acts.logistics_v1.dto.RouteResponseDTO;
import com.cdac.acts.logistics_v1.model.Route;
import com.cdac.acts.logistics_v1.repository.RouteRepository;
import com.cdac.acts.logistics_v1.service.RouteService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RouteServiceImpl implements RouteService {

    private final RouteRepository routeRepository;
    private final RestTemplate restTemplate;

    @Value("${openrouteservice.api.key}")
    private String orsApiKey;

    private static final String ORS_URL = "https://api.openrouteservice.org/v2/directions/driving-car";

    @Override
    public RouteResponseDTO createRoute(RouteRequestDTO request) {
       return fetchAndSaveRouteDetails(
    		    request.getSourceAddress(),
                request.getSourceLatitude(),
                request.getSourceLongitude(),
                request.getDestinationAddress(),
                request.getDestinationLatitude(),
                request.getDestinationLongitude()
        );

       
    }

    @Override
    public RouteResponseDTO getRouteById(Long id) {
        return routeRepository.findById(id)
                .map(this::mapToResponseDTO)
                .orElseThrow(() -> new RuntimeException("Route not found"));
    }

    @Override
    public List<RouteResponseDTO> getAllRoutes() {
        return routeRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Override
    public RouteResponseDTO updateRoute(Long id, RouteRequestDTO request) {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Route not found"));

        route.setSourceAddress(request.getSourceAddress());
        route.setSourceLatitude(request.getSourceLatitude());
        route.setSourceLongitude(request.getSourceLongitude());
        route.setDestinationAddress(request.getDestinationAddress());
        route.setDestinationLatitude(request.getDestinationLatitude());
        route.setDestinationLongitude(request.getDestinationLongitude());
        route.setTravelMode(request.getTravelMode());

        RouteResponseDTO updatedRoute = fetchAndSaveRouteDetails(
        		
                request.getSourceAddress(), request.getSourceLatitude(), request.getSourceLongitude(),
                request.getDestinationAddress(), request.getDestinationLatitude(), request.getDestinationLongitude()
        );

        route.setDistance(updatedRoute.getDistance());
        route.setDuration(updatedRoute.getDuration());
        route.setGeometry(updatedRoute.getGeometry());
        route.setInstructions(updatedRoute.getInstructions());

        Route saved = routeRepository.save(route);
        return mapToResponseDTO(saved);
    }

    @Override
    public boolean deleteRoute(Long id) {
        if (routeRepository.existsById(id)) {
            routeRepository.deleteById(id);
            return true;  // Deletion successful
        }
        return false;  // Route not found
    }


//    @Override
//    public RouteResponseDTO fetchAndSaveRouteDetails(Double srcLat, Double srcLng, Double dstLat, Double dstLng) {
//        Map<String, Object> body = new HashMap<>();
//        body.put("coordinates", List.of(
//                List.of(srcLng, srcLat),
//                List.of(dstLng, dstLat)
//        ));
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.set("Authorization", orsApiKey);
//
//        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
//
//        ResponseEntity<Map> response = restTemplate.postForEntity(ORS_URL, entity, Map.class);
//        if (response.getStatusCode() != HttpStatus.OK) {
//            throw new RuntimeException("Failed to fetch route from OpenRouteService");
//        }
//
//        Map<String, Object> feature = ((List<Map<String, Object>>) response.getBody().get("features")).get(0);
//        Map<String, Object> properties = (Map<String, Object>) feature.get("properties");
//        Map<String, Object> summary = (Map<String, Object>) properties.get("summary");
//
//        double distance = ((Number) summary.get("distance")).doubleValue();
//        double duration = ((Number) summary.get("duration")).doubleValue();
//        String geometry = feature.get("geometry").toString();
//        String instructions = properties.get("segments").toString();
//
//        return RouteResponseDTO.builder()
//                .distance(distance)
//                .duration(duration)
//                .geometry(geometry)
//                .instructions(instructions)
//                .build();
//    }

    @Override
    public RouteResponseDTO fetchAndSaveRouteDetails(String srcAddress, Double srcLat, Double srcLng, String destAddress, Double dstLat, Double dstLng) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(MediaType.APPLICATION_JSON);
    	headers.set("Authorization",orsApiKey);

    	Map<String, Object> requestBody = new HashMap<>();
    	requestBody.put("coordinates", List.of(
    	    List.of(srcLng, srcLat), // OpenRouteService expects: [longitude, latitude]
    	    List.of(dstLng, dstLat)
    	));
    	requestBody.put("instructions", true);      
    	requestBody.put("geometry", true);           
//    	requestBody.put("geometry_format", "geojson"); // only if geojson is explicitly needed
    	requestBody.put("preference", "fastest");    // "shortest"/ "recommended"
    	requestBody.put("units", "km");              
    	requestBody.put("language", "en");           

    	HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

    	ResponseEntity<String> response = restTemplate.postForEntity(ORS_URL, entity, String.class);

    	if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
    	    JSONObject json = new JSONObject(response.getBody());

    	    if (!json.has("routes") || json.getJSONArray("routes").isNull(0)) {
    	        throw new RuntimeException("No route found in API response");
    	    }

    	    JSONObject route = json.getJSONArray("routes").getJSONObject(0);
    	    String geometry = route.getString("geometry");
    	    JSONObject summary = route.getJSONObject("summary");
    	    double distance = summary.getDouble("distance");
    	    double duration = summary.getDouble("duration");


    	    
    	    
    	    
    	    JSONArray segments = route.getJSONArray("segments");
            JSONArray steps = segments.getJSONObject(0).getJSONArray("steps");
    	    
    	    StringBuilder instructionBuilder = new StringBuilder();
            for (int i = 0; i < steps.length(); i++) {
                JSONObject step = steps.getJSONObject(i);
                instructionBuilder.append((i + 1)).append(". ")
                    .append(step.getString("instruction"))
                    .append(" (").append(step.getDouble("distance")).append(" m)\n");
            }
    	    
            Route routeEntity = new Route();
            routeEntity.setSourceLatitude(srcLat);
            routeEntity.setSourceLongitude(srcLng);
            routeEntity.setDestinationLatitude(dstLat);
            routeEntity.setDestinationLongitude(dstLng);
            routeEntity.setDistance(distance);
            routeEntity.setDuration(duration);
            routeEntity.setGeometry(geometry);
            routeEntity.setInstructions(instructionBuilder.toString());
            routeEntity.setSourceAddress(srcAddress);
            routeEntity.setDestinationAddress(destAddress);
            routeEntity.setTravelMode("driving-car");
            routeEntity.setIsActive(true);
            routeEntity.setCreatedAt(LocalDateTime.now());

    	    Route saved = routeRepository.save(routeEntity);
    	    return mapToResponseDTO(saved);
    	} else {
    	    throw new RuntimeException("Invalid response from routing API: " + response.getStatusCode());
    	}

    }


    
    private RouteResponseDTO mapToResponseDTO(Route route) {
        return RouteResponseDTO.builder()
                .id(route.getId())
                .sourceAddress(route.getSourceAddress())
                .sourceLatitude(route.getSourceLatitude())
                .sourceLongitude(route.getSourceLongitude())
                .destinationAddress(route.getDestinationAddress())
                .destinationLatitude(route.getDestinationLatitude())
                .destinationLongitude(route.getDestinationLongitude())
                .distance(route.getDistance())
                .duration(route.getDuration())
                .geometry(route.getGeometry())
                .instructions(route.getInstructions())
                .travelMode(route.getTravelMode())
                .isActive(route.getIsActive())
                .createdAt(route.getCreatedAt())
                .build();
    }
}
