#!/usr/bin/env python

from fastapi import FastAPI, HTTPException, Response
import json
import numpy as np
import pandas as pd
import os

app = FastAPI()

csv_df = pd.read_csv("./final_data.csv").convert_dtypes()


@app.get("/chart")
def get_chart():
    county_features = (
        csv_df.set_index("patient_county_name")
        .loc[:, "high_quant":"male"]
        .groupby("patient_county_name")
        .mean()
    )
    return county_features.transpose().to_json(orient="table")


@app.get("/map")
def get_map():
    county_risk = csv_df.loc[:, ["patient_county_name", "predicted_probability"]]
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
