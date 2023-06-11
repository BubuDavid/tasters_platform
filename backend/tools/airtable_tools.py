import requests as req
from config import airtable_variables_loader

def get_mapping_table():
	airtable_variables = airtable_variables_loader()
	url = f"https://api.airtable.com/v0/{airtable_variables['base_id']}/{airtable_variables['mapping_table']}"
	headers = {'Authorization': f"Bearer {airtable_variables['token']}"}

	res = req.get(url=url, headers=headers)

	if res.status_code not in range(200, 300):
		raise Exception(f"Something went wrong with mapping table, {res.status_code}")

	records = res.json()['records']


	# Convert to mapping object
	fields = list(map(lambda record: record['fields'], records))
	tables = {}
	for record in fields:
		if len(record) != 0:
			tables[record['table'][0]] = record['table_front_name']

	mapping_dict = {}


	for table, table_front in tables.items():
		mapping_dict[table] = {'front_name': table_front, 'table_name': table}
		if 'fields_map' not in mapping_dict[table]:
			mapping_dict[table]['fields_map'] = {}

		for record in filter(lambda record: table in record['table'], fields):
			mapping_dict[table]['fields_map'][record['field_name']] = {
				'front_name': record['front_name'],
				'type': record['type'],
				'position': record['position'] if 'position' in record else None,
			}

	return mapping_dict



def get_airtable_table(table_name, user_id):
	airtable_variables = airtable_variables_loader()
	url = f"https://api.airtable.com/v0/{airtable_variables['base_id']}/{table_name}?filterByFormula=%7Buser_id%7D%3D%22{user_id}%22"
	headers = {'Authorization': f"Bearer {airtable_variables['token']}"}

	
	res = req.get(url=url, headers=headers)
	if res.status_code not in range(200, 300):
		raise Exception(f"Something went wrong with mapping table, {res.status_code}")
	

	records = res.json()['records']

	
	return records[0]['fields'] if len(records) != 0 else []



