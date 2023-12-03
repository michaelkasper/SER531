import pandas as pd

# load the existing csv file
df = pd.read_csv('data/opendata/final_output.csv')

# function to add '-01-01' to year values
def format_year_to_date(year):
    if pd.notnull(year) and year != '':
        year = int(year)
        return f'{year}-01-01'
    return year

# apply the formatting function to the necessary columns
df['birthDate_artist'] = df['birthDate_artist'].apply(format_year_to_date)
df['deathDate_artist'] = df['deathDate_artist'].apply(format_year_to_date)
df['beginDate_artwork'] = df['beginDate_artwork'].apply(format_year_to_date)
df['endDate_artwork'] = df['endDate_artwork'].apply(format_year_to_date)

# save the updated dataframe back to csv
df.to_csv('data/opendata/dateformat_final_output.csv', index=False)

print("CSV file has been updated successfully.")
