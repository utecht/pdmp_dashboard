#!/usr/bin sh
wget https://github.com/nytimes/covid-19-data/raw/master/us-counties.csv
./update_covid_data.py > covid_data.json
