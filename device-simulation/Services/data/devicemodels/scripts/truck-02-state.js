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
    latitude: 47.5006616,
    longitude: -122.1859029,
    speed: 80.0,
    speed_unit: "mph",
    temperature: 49.0,
    temperature_unit: "F"
};

// Default properties
var properties = {
    latitude: 47.5006616,
    longitude: -122.1859029
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
    [47.50066160, -122.1859029, 83.0, 14.004],
    [47.50344484, -122.1768335, 113.0, 13.644],
    [47.50530025, -122.1569494, 123.0, 13.524],
    [47.50588005, -122.1413568, 136.0, 13.368],
    [47.50240114, -122.1298555, 113.0, 13.644],
    [47.49811017, -122.1157792, 108.0, 13.704],
    [47.49845323, -122.0979256, 102.0, 13.776],
    [47.49437276, -122.0852188, 108.0, 13.704],
    [47.48892117, -122.0773224, 105.0, 13.74],
    [47.48114878, -122.0603279, 102.0, 13.776],
    [47.47906048, -122.0392136, 81.0, 14.028],
    [47.48474510, -122.0271973, 62.0, 14.256],
    [47.47221492, -122.0233349, 101.0, 13.788],
    [47.46119052, -122.0099167, 95.0, 13.86],
    [47.45260149, -121.9951538, 118.0, 13.584],
    [47.44168908, -121.9850258, 132.0, 13.416],
    [47.43541923, -121.9754128, 156.0, 13.128],
    [47.44849993, -121.9585900, 270.0, 11.76],
    [47.46019325, -121.9474034, 377.0, 10.476],
    [47.46529967, -121.9345001, 406.0, 10.128],
    [47.46557599, -121.9265687, 413.0, 10.044],
    [47.47075370, -121.9128708, 347.0, 10.836],
    [47.47353853, -121.8981079, 271.0, 11.748],
    [47.48370961, -121.8891243, 234.0, 12.192],
    [47.49658500, -121.8860344, 280.0, 11.64],
    [47.50736331, -121.8837638, 277.0, 11.676],
    [47.51080999, -121.8561367, 282.0, 11.616],
    [47.50489626, -121.8252377, 194.0, 12.672]
];

/**
 * Locate the index of the current data point.
 */
function findCurrentDataIndex() {
    var i;
    for (i = 0; i < data.length; i++) {
        if (data[i][0] === properties.latitude) return i;
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
    state.latitude = properties.latitude = data[0];
    state.longitude = properties.longitude = data[1];
    state.altitude = data[2];
    state.temperature = data[3];

    // 30 +/- 5%,  Min 0, Max 80
    state.speed = vary(30, 5, 0, 80);

    // current temperature +/- 1%,  Min/Max: current +/- 15
    state.temperature = vary(state.temperature, 1, state.temperature - 15, state.temperature + 15);

    updateState(state);
    updateProperty("latitude", state.latitude);
    updateProperty("longitude", state.longitude);

    // Sleep so truck movement seems more realistic
    sleep(20000);
}
