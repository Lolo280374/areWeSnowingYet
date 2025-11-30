import json
from datetime import datetime, timedelta

now = datetime.utcnow()
next_refresh = now + timedelta(hours=5)

data = {
    "generated": now.isoformat() + "Z",
    "next_refresh": next_refresh.isoformat() + "Z"
}

with open("snowing.json", "w") as f:
    json.dump(data, f, indent=2)

print(json.dumps(data, indent=2))