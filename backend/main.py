# Improt fastapi
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Import requests
import requests as req
# Import load_dotenv
from dotenv import load_dotenv
import os



load_dotenv()

app = FastAPI()

# CORS POLICY CORRECTION 
app.add_middleware(
		CORSMiddleware,
		allow_origins = ["*"],
		allow_credentials = True,
		allow_methods = ["*"],
		allow_headers = ["*"],
	)
@app.get('/')
def hello_world():
	return 'Hello World'


@app.get('/user_data')
def user_data(id: str = None):
	if not id:
		return []
	
	headers = {
		"Authorization": f"Bearer {os.getenv('AIRTABLE_TOKEN')}"
	}
	url = f"https://api.airtable.com/v0/{os.getenv('AIRTABLE_BASE')}/{os.getenv('AIRTABLE_TABLE')}"
	res = req.get(url, headers=headers)
	records = res.json()['records']

	record = list(filter(lambda record: record['id'] == id, records))

	return record[0]['fields'] if record else []