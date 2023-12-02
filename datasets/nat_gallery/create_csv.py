import pandas as pd

# paths to csv
constituents_path = 'data/opendata/data/constituents.csv'
objects_path = 'data/opendata/data/objects.csv'
published_images_path = 'data/opendata/data/published_images.csv'

# read csv into dataframes
# low_memory=False to address DtypeWarning
constituents_df = pd.read_csv(constituents_path, low_memory=False)
objects_df = pd.read_csv(objects_path, low_memory=False)
published_images_df = pd.read_csv(published_images_path, low_memory=False)

# change key columns to strings to avoid merge conflicts
constituents_df['constituentid'] = constituents_df['constituentid'].astype(str)
objects_df['objectid'] = objects_df['objectid'].astype(str)
published_images_df['uuid'] = published_images_df['uuid'].astype(str)

# select and rename columns
constituents_df = constituents_df[['constituentid', 'preferreddisplayname', 'nationality', 'beginyear', 'endyear']]
objects_df = objects_df[['objectid', 'title', 'medium', 'dimensions', 'beginyear', 'endyear']]
published_images_df = published_images_df[['uuid', 'iiifurl']]

# static data fields
constituents_df['gender_artist'] = ''  # Gender is left blank
constituents_df['artworkCreationLocation_artwork'] = ''  # Artwork creation location is left blank
objects_df['artworkCurrentLocation_artwork'] = 'National Gallery of Art'
objects_df['lon_location'] = '-77.0200'  # Longitude of the National Gallery of Art
objects_df['lat_location'] = '38.8913'   # Latitude of the National Gallery of Art
objects_df['country_location'] = 'United States of America'

# merge dataframes on objectid and constituentid
merged_df = pd.merge(objects_df, constituents_df, how='left', left_on='objectid', right_on='constituentid')

# merge published_images_df
final_df = pd.merge(merged_df, published_images_df, how='left', left_on='objectid', right_on='uuid')

# columns for the final csv
final_columns = [
    'gender_artist', 'preferreddisplayname', 'nationality', 'beginyear_x', 'endyear_x',
    'iiifurl', 'artworkCreationLocation_artwork', 'dimensions', 'artworkCurrentLocation_artwork',
    'title', 'medium', 'lon_location', 'lat_location', 'country_location', 'beginyear_y', 'endyear_y'
]
final_df = final_df[final_columns]

# rename to match ontology
final_df.columns = [
    'gender_artist', 'name_artist', 'nationality_artist', 'birthDate_artist', 'deathDate_artist',
    'artworkImgeURL_artwork', 'artworkCreationLocation_artwork', 'dimension_artwork', 'artworkCurrentLocation_artwork',
    'artworkTitle_artwork', 'mediaType_artwork', 'lon_location', 'lat_location', 'country_location', 'beginDate_artwork', 'endDate_artwork'
]

# export the final dataframe to csv
final_df.to_csv('data/opendata/final_output.csv', index=False)

print("csv's done")