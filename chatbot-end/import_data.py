import pandas as pd
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client["Spirit11"]
players_collection = db["cricketers"]

# Load CSV into Pandas DataFrame
df = pd.read_csv("sample_data.csv")

# Handle missing values (optional)
df = df.fillna("N/A")

# Convert DataFrame to dictionary format
data = df.to_dict(orient="records")

# Drop existing collection to prevent duplicate inserts (optional)
players_collection.drop()

# Insert data into MongoDB
if data:
    players_collection.insert_many(data)
    print(f"{len(data)} records successfully imported into MongoDB!")
else:
    print("No data found in dataset.csv!")

# Close MongoDB connection
client.close()
