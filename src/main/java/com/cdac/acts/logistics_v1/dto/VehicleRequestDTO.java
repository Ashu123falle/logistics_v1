package com.cdac.acts.logistics_v1.dto;

import java.util.*;

import lombok.Data;
@Data
public class VehicleRequestDTO {
    private String vehicleNumber;
    private String model;
    private String type;
    private Double capacity;

}
