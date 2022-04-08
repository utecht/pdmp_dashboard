#!/bin/sh

uvicorn --workers 2 --host 0.0.0.0 --port 9090 main:app
