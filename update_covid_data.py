#!/usr/bin/env python3
import csv
import json
import datetime

data = []
counties = set()
output = {}

with open("us-counties.csv", "r") as csvdata:
    csvreader = csv.DictReader(csvdata)
    for row in csvreader:
        if row['state'] == 'Arkansas':
            counties.add(row['county'])
            row.pop('state', None)
            row.pop('fips', None)
            data.append(row)

for county in counties:
    todays_data = None
    todays_date = datetime.datetime.strptime('2020-01-01', '%Y-%m-%d')
    county_data = {}
    county_data['history'] = []
    for row in data:
        if row['county'] == county:
            #row.pop('county', None)
            county_data['history'].append(row)
            date = datetime.datetime.strptime(row['date'], '%Y-%m-%d')
            if date > todays_date:
                todays_data = row
    county_data['cases'] = todays_data['cases']
    county_data['deaths'] = todays_data['deaths']
    output[county] = county_data

print("var covid_nums = {};".format(json.dumps(output)))
