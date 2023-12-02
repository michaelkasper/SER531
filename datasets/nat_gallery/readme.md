SER531 Project to generate the csv from the national gallery of art data.
Soohwan Kim, jskim26

To get fresh data you can clone their github and you can re-run these commands to generate data:
https://github.com/NationalGalleryOfArt/opendata

'create_csv.py' should be in same level directory as /data

just run 'python create_csv.py' and it should make the output file here:
'data/opendata/final_output.csv'

'format_date.py' runs date formatting to 'YYYY-MM-DD', however the nat gallery data just has years so it processes the 'final_output.csv' file and changes the date values to the format 'YYYY-01-01'.

just run 'python format_date.py' and the output will be:
'data/opendata/dateformat_final_output.csv'