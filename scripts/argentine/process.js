const data = require("./Argentine-Contemporary-Art-Repository.json");
const fs = require("fs");

const processed = [];
for (const entry of data) {
    const workType = entry["VRAE:Work Type "]?.["en"]?.replaceAll(/\[aat:\d+\]/g, "").split(";").map(s => s.trim()).join(",")
    const workMaterial = entry["VRAE:Work Material "]?.["en"]?.replaceAll(/\[aat:\d+\]/g, "").split(";").map(s => s.trim()).join(",")
    const dateMatch = entry["VRAE:Work Date"].match(/(?:.+?)?(\d{4})/);
    const date = dateMatch ? `01-01-${dateMatch[1]}` : "";
    processed.push({
        "Ref ID": entry["VRAE:Work Refid"],
        "File Name": entry["File Name"],
        "Title": entry["VRAE:Work Title"],
        "Work Type": workType,
        "Work Date": date,
        "Material": workMaterial,
        "Description": entry["VRAE:Work Description "]?.["en"],
        "Measurements": entry["VRAE:Work Measurements"],
        "Location": entry["VRAE:Work Location"],
        "GPSLatitude": entry["VRAE:GPSLatitude"],
        "GPSLongitude": entry["VRAE:GPSLongitude"],
        "Image Href": entry["VRAE:Image Href "]?.["en"],
    });
}

fs.writeFileSync("processed.json", JSON.stringify(processed), "utf8")
