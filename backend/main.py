# Configuration imports
from config import config_app
from tools.airtable_tools import get_mapping_table, get_airtable_table

# ====== FASTAPI CONFIGURATION ====== #
app = config_app()
# =================================== #

@app.get('/user_data')
async def user_data(user_id: str = None, page: str = None):
	if not user_id:
		return {}
	if not page:
		page = 'users'
	
	try:
		mapping_table = get_mapping_table()
	except Exception as e:
		raise Exception(e)

	if page not in mapping_table:
		return {}
	
	mapping = mapping_table[page]

	try:
		user_data = get_airtable_table(page, user_id)
	except Exception as e:
		raise Exception(e)
	
	
	fields_map = mapping['fields_map']
	response = {'current_page': page, 'front_name': mapping['front_name'], 'fields_map': []}
	response['all_pages'] = []
	for k in sorted(mapping_table.keys()):
		response['all_pages'].append({k:mapping_table[k]['front_name']})
	for field in fields_map:
		current_field = fields_map[field]
		current_field['field_name'] = field
		current_field['value'] = user_data[field] if field in user_data else None

		response['fields_map'].append(current_field)
			
		response['fields_map'].sort(key = lambda field: int(field['position']) if field['position'] else 0)
	return response