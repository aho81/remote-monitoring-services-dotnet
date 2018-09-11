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
    temperature: 49.0,
    temperature_unit: "F"
};

// Default properties
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

    log("**** Seeing if there are default properties");
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
    [47.49437276, -122.0852188, 108.0, 56.6672],
    [47.48892117, -122.0773224, 105.0, 56.7320],
    [47.48114878, -122.0603279, 102.0, 56.7968],
    [47.47906048, -122.0392136, 81.0, 57.2504],
    [47.48474510, -122.0271973, 62.0, 57.6608],
    [47.47221492, -122.0233349, 101.0, 56.8184],
    [47.46119052, -122.0099167, 95.0, 56.9480],
    [47.45260149, -121.9951538, 118.0, 56.4512],
    [47.44168908, -121.9850258, 132.0, 56.1488],
    [47.43541923, -121.9754128, 156.0, 55.6304],
    [47.44849993, -121.9585900, 270.0, 53.1680],
    [47.46019325, -121.9474034, 377.0, 50.8568],
    [47.46529967, -121.9345001, 406.0, 50.2304],
    [47.46557599, -121.9265687, 413.0, 50.0792],
    [47.47075370, -121.9128708, 347.0, 51.5048],
    [47.47353853, -121.8981079, 271.0, 53.1464],
    [47.48370961, -121.8891243, 234.0, 53.9456],
    [47.49658500, -121.8860344, 280.0, 52.9520],
    [47.50736331, -121.8837638, 277.0, 53.0168],
    [47.51080999, -121.8561367, 282.0, 52.9088],
    [47.50489626, -121.8252377, 194.0, 54.8096],
    [47.50489626, -121.8252377, 194.0, 54.8096],
    [47.51080999, -121.8561367, 282.0, 52.9088],
    [47.50736331, -121.8837638, 277.0, 53.0168],
    [47.49658500, -121.8860344, 280.0, 52.9520],
    [47.48370961, -121.8891243, 234.0, 53.9456],
    [47.47353853, -121.8981079, 271.0, 53.1464],
    [47.47075370, -121.9128708, 347.0, 51.5048],
    [47.46557599, -121.9265687, 413.0, 50.0792],
    [47.46529967, -121.9345001, 406.0, 50.2304],
    [47.46019325, -121.9474034, 377.0, 50.8568],
    [47.44849993, -121.9585900, 270.0, 53.1680],
    [47.43541923, -121.9754128, 156.0, 55.6304],
    [47.44168908, -121.9850258, 132.0, 56.1488],
    [47.45260149, -121.9951538, 118.0, 56.4512],
    [47.46119052, -122.0099167, 95.0, 56.9480],
    [47.47221492, -122.0233349, 101.0, 56.8184],
    [47.48474510, -122.0271973, 62.0, 57.6608],
    [47.47906048, -122.0392136, 81.0, 57.2504],
    [47.48114878, -122.0603279, 102.0, 56.7968],
    [47.48892117, -122.0773224, 105.0, 56.7320],
    [47.49437276, -122.0852188, 108.0, 56.6672],
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
    state.latitude = data[0];
    state.longitude = data[1];
    state.altitude = data[2];
    state.temperature = data[3];

    properties.Latitude = data[0];
    properties.Longitude = data[1];

    // 30 +/- 5%,  Min 0, Max 80
    state.speed = vary(30, 5, 0, 80);

    // current temperature +/- 1%,  Min/Max: current +/- 15
    state.temperature = vary(state.temperature, 1, state.temperature - 15, state.temperature + 15);

    updateState(state);
    updateProperty("Latitude", properties.Latitude);
    updateProperty("Longitude", properties.Longitude);
}
