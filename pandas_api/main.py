#!/usr/bin/env python

from fastapi import FastAPI, HTTPException, Response
import json
import numpy as np
import pandas as pd
import os

app = FastAPI()

csv_df = pd.read_csv("./final_data.csv").convert_dtypes()


@app.get("/chart")
def get_chart(min_age: int = None, max_age: int = None, features: str = None):
    df = csv_df
    if min_age != None:
        df = df[df['Age'] > min_age]
    if max_age != None:
        df = df[df['Age'] < max_age]
    if features != None:
        for feature in features.split(';'):
            if feature != '':
                df = df[df[feature] == 1]
    return {
        'count': len(df),
        'data': return_chart(df)}

@app.get("/map")
def get_map(min_age: int = None, max_age: int = None, features: str = None):
    df = csv_df
    if min_age != None:
        df = df[df['Age'] > min_age]
    if max_age != None:
        df = df[df['Age'] < max_age]
    if features != None:
        for feature in features.split(';'):
            if feature != '':
                df = df[df[feature] == 1]
    return return_map(df)

def return_chart(df):
    county_features = (
        df.set_index("patient_county_name")
        .loc[:, "high_quant":"male"]
        .groupby("patient_county_name")
        .mean()
    )
    statewide = df.set_index("patient_county_name").loc[:, "high_quant":"male"].mean()
    all_features = pd.concat([county_features, statewide.to_frame('Statewide').T])
    return all_features.transpose().to_json(orient="table")

def return_map(df):
    county_risk = df.loc[:, ["patient_county_name", "predicted_probability"]]
    county_risk["od"] = county_risk["predicted_probability"].ge(0.90)
    ods = (
        county_risk.loc[:, ["patient_county_name", "od"]]
        .value_counts(normalize=True)
        .to_frame("percent")
        .reset_index()
    )
    counts = ods[ods["od"]].set_index("patient_county_name")["percent"].mul(100)
    return counts.to_frame("od").reset_index().to_dict(orient="records")


# add filters, and return either chart or map
