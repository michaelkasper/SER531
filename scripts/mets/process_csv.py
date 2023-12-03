import pandas as pd

# Read the input CSV file with explicit data types and UTF-8 encoding
input_csv_path = 'MetObjects.csv'

# Define the relevant fields
relevant_fields = [
    'Object Number', 'Object ID', 'Department', 'AccessionYear', 
    'Object Name', 'Title', 'Culture', 'Artist Role', 'Artist Display Name', 
    'Artist Alpha Sort', 'Object Date', 'Object Begin Date', 'Object End Date', 
    'City', 'State', 'County', 'Country', 'Region', 
    'Subregion', 'Classification', 'Link Resource'
]

# Create a dictionary to specify data types for relevant fields
dtype_dict = {
    'Object Number': str,
    'Object ID': int,
    'Department': str,
    'AccessionYear': str,
    'Object Name': str,
    'Title': str,
    'Culture': str,
    'Artist Role': str,
    'Artist Display Name': str,
    'Artist Alpha Sort': str,
    'Object Date': str,
    'Object Begin Date': str,
    'Object End Date': str,
    'City': str,
    'State': str,
    'County': str,
    'Country': str,
    'Region': str,
    'Subregion': str,
    'Classification': str,
    'Link Resource': str
}

# Read CSV file using pandas
with open(input_csv_path, 'r', encoding='utf-8-sig') as file:
    df = pd.read_csv(file, usecols=relevant_fields, dtype=dtype_dict)

# Save the data to a new CSV file with UTF-8 encoding
output_csv_path = 'post_processed_met_objects.csv'
with open(output_csv_path, 'w', encoding='utf-8-sig', newline='') as file:
    df.to_csv(file, index=False)

print(f"Data has been processed and saved to {output_csv_path}")