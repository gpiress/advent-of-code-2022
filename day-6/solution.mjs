import { readFileSync } from 'fs';

// Input logic
const TEST_LINES = readFileSync('test.in', 'utf-8').split('\r\n');
const INPUT_LINES = readFileSync('input.in', 'utf-8').split('\r\n');


// Solution logic
const isValidMarker = (potentialMarkers) => {
    const uniqueChars = new Set();

    let duplicate = false;
    for (let char of potentialMarkers) {
        if (uniqueChars.has(char)) {
            duplicate = true;
            break;
        } else {
            uniqueChars.add(char);
        }
    }

    return !duplicate;
};

const getMarkerPos = datastream => {
    const markers = [];
    let i = 0;
    for (i = 0; i < datastream.length; i++) {
        if (markers.length < 4) {
            markers.push(datastream.charAt(i));
            continue;
        }

        // check if markers are valid
        if (isValidMarker(markers)) {
            break;
        }

        markers.shift();
        markers.push(datastream.charAt(i));
    }

    return i;
};

const getMessageStart = datastream => {
    const markers = [];
    let i = 0;
    for (i = 0; i < datastream.length; i++) {
        if (markers.length < 14) {
            markers.push(datastream.charAt(i));
            continue;
        }

        // check if markers are valid
        if (isValidMarker(markers)) {
            break;
        }

        markers.shift();
        markers.push(datastream.charAt(i));
    }

    return i;
}


const firstPart = (allReadings) => {
    allReadings
        .map(getMarkerPos)
        .map(markerPos => console.log({markerPos}));
};

const secondPart = (allReadings) => {
    allReadings
        .map(getMessageStart)
        .map(messagePos => console.log({messagePos}));
};


// Call solution
firstPart(INPUT_LINES);
secondPart(INPUT_LINES);