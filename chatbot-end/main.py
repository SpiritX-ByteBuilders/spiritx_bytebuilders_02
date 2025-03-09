import os
from fastapi import FastAPI
from pymongo import MongoClient
import google.generativeai as genai
from dotenv import load_dotenv

app = FastAPI()

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017")
db = client["Spirit11"]
cricketers_collection = db["cricketers"]

# Gemini AI Setup
load_dotenv()
api_key = os.getenv("GEMINI_AI_API_KEY")
if not api_key:
    raise ValueError("API key not found. Please set GEMINI_AI_API_KEY in the .env file.")
genai.configure(api_key=api_key)

@app.post("/chatbot")
async def chatbot(query: dict):
    user_query = query["query"].lower()

    if "best cricket team" in user_query:
        # Get the best 11 players based on highest possible stats (runs and wickets)
        best_team = list(cricketers_collection.find().sort([("runs", -1), ("wickets", -1)]).limit(11))

        team_names = [player["Name"] for player in best_team]  # Update field name to match MongoDB documents
        reply = f"The best cricket team based on stats: {', '.join(team_names)}"

    elif "player stats" in user_query:
        # Extract player name from query
        player_name = user_query.replace("player stats", "").strip()

        # Fetch player details from MongoDB
        player = cricketers_collection.find_one({"Name": {"$regex": player_name, "$options": "i"}})  # Update field name to match MongoDB documents

        if player:
            # Formatted response without revealing points
            reply = (
                f"Player: {player['Name']}\n"  # Update field name to match MongoDB documents
                f"Team: {player['Team']}\n"  # Update field name to match MongoDB documents
                f"Matches: {player['Matches']}\n"  # Update field name to match MongoDB documents
                f"Runs: {player['Runs']}\n"  # Update field name to match MongoDB documents
                f"Wickets: {player['Wickets']}\n"  # Update field name to match MongoDB documents
                "Note: Player points are confidential and cannot be revealed."
            )
        else:
            reply = "Sorry, I couldn’t find any player with that name in the dataset."

    elif "best player" in user_query:
        reply = (
            "There's no single answer to the question of \"who is the best player?\" "
            "It depends on the sport and the criteria used to define \"best.\" Please specify your criteria."
        )

    else:
        # Use Gemini AI for general queries
        model = genai.GenerativeModel("gemini-pro")
        gemini_response = model.generate_content(user_query)
        reply = gemini_response.text if gemini_response else "I don’t have enough knowledge to answer that question."

    return {"reply": reply}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
