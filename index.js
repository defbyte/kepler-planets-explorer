const { parse } = require('csv-parse');
const { createReadStream, createWriteStream } = require('fs');
const { platform } = require('os');
require('dotenv').config();

const KEPLER_DATA_FILE_PATH = process.env.KEPLER_DATA_FILE_PATH
const habitablePlanets = [];

// Filter function for Kepler Planet Data
// TODO: explore different criteria settings for what we consider a habitable planet
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

// pipe function meant to connect readable stream source to a write stream thingy/destination
createReadStream(KEPLER_DATA_FILE_PATH)
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            habitablePlanets.push(data);
        }
    })
    .on('error', (error) => {
        console.log(error);
    })
    .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found.`);

        // Log the names of the planets
        console.log(habitablePlanets.map((planet) => {
            return planet['kepler_name'];
        }));

        console.log('done');
    })