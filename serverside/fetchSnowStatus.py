import csv
import json
from datetime import datetime, timedelta
import requests

CITY_LIST = "cities-simplemaps.csv"
SNOWING_CITIES_OUTPUT = "snowing.json"
ACCEPTED_CODES = [71, 73, 75, 77, 85, 86]
OM_API_URL = "https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&current_weather=true"

saved_cities = 0
cities = []
with open(CITY_LIST, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        population_str = row.get("population", "").strip()
        if not population_str:
            continue
        try:
            population = float(population_str)
        except ValueError:
            continue
        if population > 100000:
            cities.append({
                "name": row["city"],
                "country": row["country"],
                "lat": float(row["lat"]),
                "lng": float(row["lng"])
            })
print(f"including {len(cities)} cities in the queries...")

now = datetime.utcnow()
next_refresh = now + timedelta(hours=5)
geojson = {
    "type": "FeatureCollection",
    "generated": now.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
    "next_refresh": next_refresh.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
    "features": []
}

with open(SNOWING_CITIES_OUTPUT, "w", encoding="utf-8") as f:
    json.dump(geojson, f, ensure_ascii=False, indent=2)

for i, city in enumerate(cities, start=1):
    try:
        url = OM_API_URL.format(lat=city["lat"], lng=city["lng"])
        resp = requests.get(url, timeout=10)
        data = resp.json()
        current = data.get("current_weather")
        if not current:
            continue

        if current.get("weathercode") in ACCEPTED_CODES:
            feature = {
                "type": "Feature",
                "properties": {
                    "name": city["name"],
                    "country": city["country"],
                    "code": current.get("weathercode"),
                    "temperature": current.get("temperature"),
                    "temperature_unit": data.get("current_weather_units", {}).get("temperature", "°C")
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [city["lng"], city["lat"]]
                }
            }

            with open(SNOWING_CITIES_OUTPUT, "r+", encoding="utf-8") as f:
                data = json.load(f)
                data["features"].append(feature)
                f.seek(0)
                json.dump(data, f, ensure_ascii=False, indent=2)
                f.truncate()
                saved_cities += 1
            print(f"[{i}/{len(cities)}] saved {city['name']} in json")

    except Exception as e:
        pass

print(f"successfully queried {saved_cities} cities.")