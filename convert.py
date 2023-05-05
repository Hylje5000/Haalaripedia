import pandas as pd

# Read the Excel file into a pandas dataframe
df = pd.read_excel('Opiskelijahaalarit.xlsx','WorkingList')

# Convert the dataframe to JSON
json_data = df.to_json(orient='records',)

# Save the JSON data to a file
with open('data.json', 'w') as f:
    f.write(json_data)