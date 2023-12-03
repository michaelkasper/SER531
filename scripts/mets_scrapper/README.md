# PRONTO Post Processing script for `The Metropolitan Museum of Art Open Access CSV`

````
Arizona State University
````

### Authors:

- Michael Kasper - mkasper@asu.edu

---
This tool consumes the output of the [mets](../mets) script and scraps the provided urls
for the images. The scrapping tools converted the images landing page to a direct url to the images.

After scrapping the tool appends the new image url to the CSV data.

---

## SETUP

In the project directory, you can run the following commands in a terminal window:

```
nvm install
nvm use
```

- `nvm install` will install the node version specified in the `.nvmrc` file.
- `nvm use` will start the node version specified in the `.nvmrc` file.

> `nvm use` will need to be run everytime you open a new terminal window.

Add the output file of the [mets](../mets) script to the `src/resources` directory. Rename the file
to `post_processed_mets_object.csv`

## Usage

In the project directory, you can run the following commands in a terminal window:

```
npm run app
```

## Output

The script will convert the Image Landing page URLs to direct image URLS. The new CSV file will be located in
the `src/resources/output.csv`

The script will only scrap the first 10,000 rows of the CSV file that have a valid image url. To scrap more images you
can modify the `src/index.js` file and change the `processCount` variable to the number of images you want to scrap.


> Note: The script will create a cache file in the `src/resources` directory
> called `processed_urls.txt`. This cache file is used to prevent the script from
> scrapping the same image multiple times. If you want to scrap the same image multiple times you can delete the cache
> file.
> 
> This will allow the user to start and stop the script without having to scrap the same images multiple times.
