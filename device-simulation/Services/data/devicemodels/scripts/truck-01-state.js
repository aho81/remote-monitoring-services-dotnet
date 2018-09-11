// Copyright (c) Microsoft. All rights reserved.

/*global log*/
/*global updateState*/
/*global updateProperty*/
/*jslint node: true*/

"use strict";

// Default state
var state = {
    online: true,
    altitude: 83.0,
    latitude: 47.50066160,
    longitude: -122.1859029,
    speed: 80.0,
    speed_unit: "mph",
    temperature: 38.0,
    temperature_unit: "F"
};

// Default properties
// Note: property names are case sensitive
var properties = {
    Latitude: 47.50066160,
    Longitude: -122.1859029
};

/**
 * Restore the global state using data from the previous iteration.
 *
 * @param previousState device state from the previous iteration
 * @param previousProperties device properties from the previous iteration
 */
function restoreSimulation(previousState, previousProperties) {
    // If the previous state is null, force a default state
    if (previousState) {
        state = previousState;
    } else {
        log("Using default state");
    }

    if (previousProperties) {
        properties = previousProperties;
    } else {
        log("Using default properties");
    }
}

/**
 * Simple formula generating a random value around the average
 * in between min and max
 */
function vary(avg, percentage, min, max) {
    var value = avg * (1 + ((percentage / 100) * (2 * Math.random() - 1)));
    value = Math.max(value, min);
    value = Math.min(value, max);
    return value;
}

// Demo loop of data for truck
// latitude, longitude, altitude, temperature 
var data = [
    [47.50066160, -122.1859029, 83.0, 57.2072],
    [47.50344484, -122.1768335, 113.0, 56.5592],
    [47.50530025, -122.1569494, 123.0, 56.3432],
    [47.50588005, -122.1413568, 136.0, 56.0624],
    [47.50240114, -122.1298555, 113.0, 56.5592],
    [47.49811017, -122.1157792, 108.0, 56.6672],
    [47.49845323, -122.0979256, 102.0, 56.7968],
    [47.51028147, -122.0863957, 125.0, 56.3000],
    [47.51631052, -122.0721478, 134.0, 56.1056],
    [47.52593239, -122.0644230, 69.0, 57.5096],
    [47.53636374, -122.0627064, 36.0, 58.2224],
    [47.54783583, -122.0613331, 16.0, 58.6544],
    [47.54575018, -122.0540089, 16.0, 58.6544],
    [47.54383827, -122.0431943, 20.0, 58.5680],
    [47.53647963, -122.0326371, 29.0, 58.3736],
    [47.53149603, -122.0232672, 49.0, 57.9416],
    [47.53636374, -122.0088477, 94.0, 56.9696],
    [47.53253915, -121.9981188, 130.0, 56.1920],
    [47.53068471, -121.9867034, 150.0, 55.7600],
    [47.53549454, -121.9714112, 164.0, 55.4576],
    [47.53242325, -121.9557042, 151.0, 55.7384],
    [47.52813473, -121.9404263, 164.0, 55.4576],
    [47.51944072, -121.9279809, 140.0, 55.9760],
    [47.50968239, -121.9089264, 199.0, 54.7016],
    [47.50713140, -121.8903727, 276.0, 53.0384],
    [47.50736331, -121.8837638, 277.0, 53.0168],
    [47.51080999, -121.8561367, 282.0, 52.9088],
    [47.50489626, -121.8252377, 194.0, 54.8096],
    [47.50489626, -121.8252377, 194.0, 54.8096],
    [47.51080999, -121.8561367, 282.0, 52.9088],
    [47.50736331, -121.8837638, 277.0, 53.0168],
    [47.50713140, -121.8903727, 276.0, 53.0384],
    [47.50968239, -121.9089264, 199.0, 54.7016],
    [47.51944072, -121.9279809, 140.0, 55.9760],
    [47.52813473, -121.9404263, 164.0, 55.4576],
    [47.53242325, -121.9557042, 151.0, 55.7384],
    [47.53549454, -121.9714112, 164.0, 55.4576],
    [47.53068471, -121.9867034, 150.0, 55.7600],
    [47.53253915, -121.9981188, 130.0, 56.1920],
    [47.53636374, -122.0088477, 94.0, 56.9696],
    [47.53149603, -122.0232672, 49.0, 57.9416],
    [47.53647963, -122.0326371, 29.0, 58.3736],
    [47.54383827, -122.0431943, 20.0, 58.5680],
    [47.54575018, -122.0540089, 16.0, 58.6544],
    [47.54783583, -122.0613331, 16.0, 58.6544],
    [47.53636374, -122.0627064, 36.0, 58.2224],
    [47.52593239, -122.0644230, 69.0, 57.5096],
    [47.51631052, -122.0721478, 134.0, 56.1056],
    [47.51028147, -122.0863957, 125.0, 56.3000],
    [47.49845323, -122.0979256, 102.0, 56.7968],
    [47.49811017, -122.1157792, 108.0, 56.6672],
    [47.50240114, -122.1298555, 113.0, 56.5592],
    [47.50588005, -122.1413568, 136.0, 56.0624],
    [47.50530025, -122.1569494, 123.0, 56.3432],
    [47.50344484, -122.1768335, 113.0, 56.5592],
    [47.50066160, -122.1859029, 83.0, 57.2072]
];

/**
 * Locate the index of the current data point.
 */
function findCurrentDataIndex() {
    var i;
    for (i = 0; i < data.length; i++) {
        if (data[i][0] == properties.Latitude) {
            return i;
        }
    }
    return undefined;
}

/**
 * Returns the next data point in the predefined data set.
 * Loops back to start if the end of the list has been reached.
 */
function getNextMessage() {
    var index = findCurrentDataIndex();
    if (index === data.length - 1) return data[0];
    return data[index + 1];
}

/**
 * Entry point function called by the simulation engine.
 * Returns updated simulation state.
 * Device property updates must call updateProperties() to persist.
 *
 * @param context             The context contains current time, device model and id
 * @param previousState       The device state since the last iteration
 * @param previousProperties  The device properties since the last iteration
 */
/*jslint unparam: true*/
function main(context, previousState, previousProperties) {

    // Restore the global device properties and the global state before
    // generating the new telemetry, so that the telemetry can apply changes
    // using the previous function state.
    restoreSimulation(previousState, previousProperties);

    // Get the next data point in the demo loop
    // stored as an array of [latitude, longitude, altitude, temperature]
    var data = getNextMessage();
    state.latitude = properties.Latitude = data[0];
    state.longitude = properties.Longitude = data[1];
    state.altitude = data[2];
    state.temperature = data[3];

    // 30 +/- 5%,  Min 0, Max 80
    state.speed = vary(30, 5, 0, 80);

    updateState(state);
    updateProperty("Latitude", properties.Latitude);
    updateProperty("Longitude", properties.Longitude);
}
