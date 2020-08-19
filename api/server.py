#!/usr/bin/env python

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import psycopg2
import psycopg2.extras

app = FastAPI()
conn = psycopg2.connect("user=joseph dbname=joseph")

class MonthRecord(BaseModel):
    date: str
    deaths: int
    class Config:
        orm_mode = True

@app.get("/api", response_model=List[MonthRecord])
def index(county:str):
    cur = conn.cursor(cursor_factory=psycopg2.extras.NamedTupleCursor)
    cur.execute("""select year || '-' || lpad(month::text, 2, '0') || '-01' as date,
                    	  deaths from (
                    select extract(month from ddate) as month,
                           extract(year from ddate) as year,
                           county,
                           count(*) as deaths
                    from death
                    where county = %s
                    group by 1,2,3
                    order by 3,2,1) foo""", (county.upper(),))
    results = cur.fetchall()
    return results

class CauseRecord(BaseModel):
    code: str
    description: str
    count: int
    class Config:
        orm_mode = True

@app.get("/api/cause", response_model=List[CauseRecord])
def cause(county:str):
    cur = conn.cursor(cursor_factory=psycopg2.extras.NamedTupleCursor)
    cur.execute("""select code, description, count(*) from death
                   join icd10death on cause = code
                   where county = %s
                   group by code, description
                   order by count(*) desc
                   limit 20""", (county.upper(),))
    results = cur.fetchall()
    return results

class MonthZips(BaseModel):
    date: str
    prescriptions: int
    class Config:
        orm_mode = True

@app.get("/api/zip", response_model=List[MonthZips])
def zip_month(zip:str):
    cur = conn.cursor(cursor_factory=psycopg2.extras.NamedTupleCursor)
    cur.execute("""select year || '-' || lpad(month::text, 2, '0') || '-01' as date,
                    	  prescriptions from (
                    select extract(month from written_at::date) as month,
                           extract(year from written_at::date) as year,
                           patient_postal_code3,
                           count(*) as prescriptions
                    from more_pdmp
                    where patient_postal_code3 = %s
                          and written_at != ''
                          and written_at::date > '2013-06-01'
                          and written_at::date < '2018-01-01'
                    group by 1,2,3
                    order by 3,2,1) foo""", (zip,))
    results = cur.fetchall()
    return results

class ClassRecord(BaseModel):
    drug_class: Optional[str]
    count: int
    class Config:
        orm_mode = True

@app.get("/api/zip_class", response_model=List[ClassRecord])
def zip_class(zip:str):
    cur = conn.cursor(cursor_factory=psycopg2.extras.NamedTupleCursor)
    cur.execute("""select class as drug_class, count(*) from more_pdmp
                   where patient_postal_code3 = %s
                   group by class
                   order by count(*) desc
                   limit 10""", (zip,))
    results = cur.fetchall()
    return results
