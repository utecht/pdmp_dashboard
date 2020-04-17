#!/bin/bash
wget https://github.com/nytimes/covid-19-data/raw/master/us-counties.csv
./update_covid_data.py > ar_pop_demo/covid_numbers.js
rm us-counties.csv
