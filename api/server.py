#!/usr/bin/env python

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
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
