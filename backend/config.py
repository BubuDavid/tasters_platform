from fastapi import FastAPI
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware


def airtable_variables_loader():
	load_dotenv()
	airtable_env_variables = {}
	
	airtable_env_variables['base_id'] = os.getenv('AIRTABLE_BASE')
	airtable_env_variables['token'] = os.getenv('AIRTABLE_TOKEN')
	airtable_env_variables['mapping_table'] = os.getenv('AIRTABLE_MAPPING_TABLE')

	return airtable_env_variables

def config_app():
	# INITAL APP
	app = FastAPI()
	# CORS POLICY CORRECTION 
	app.add_middleware(
		CORSMiddleware,
		allow_origins = ["*"],
		allow_credentials = True,
		allow_methods = ["*"],
		allow_headers = ["*"],
	)

	return app