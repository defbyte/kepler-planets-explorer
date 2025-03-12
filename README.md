# README

This is a small node project for parsing a CSV file of Kepler planet data and filter out possible habitable planets, logging to console.

To run this locally you will need Node v20 and up, and a `.env` file with the path to the planetary data to parse. You can download the Kepler data here: https://exoplanetarchive.ipac.caltech.edu/docs/data.html, by clicking through on KOI Table (Kepler Objects of Interest) and downloading CSV data.

Example .env file contents:
```
KEPLER_DATA_FILE_PATH="data/cumulative_2025.03.07_20.49.27.csv"
```

To run the program:
```
nvm use #(assumes you have Node version manager)
npm install
npm start
```