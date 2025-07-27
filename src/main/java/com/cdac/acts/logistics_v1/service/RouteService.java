package com.cdac.acts.logistics_v1.service;

import com.cdac.acts.logistics_v1.model.Route;
import java.util.List;

public interface RouteService {
    Route addRoute(Route route);
    Route getRouteById(Long id);
    List<Route> getAllRoutes();
    Route updateRoute(Long id, Route updatedRoute);
    void deleteRoute(Long id);
}
