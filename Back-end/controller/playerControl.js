const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Replace with your actual MongoDB connection string
const client = new MongoClient(uri);
const dbName = "Spirit11"; // Replace with your actual database name

// Get all cricketers
exports.getAllPlayers = async(req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const players = await db.collection("cricketers").find().toArray();
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    } finally {
        await client.close();
    }
};

// Get a single cricketer by ID
exports.getPlayerById = async(req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const player = await db.collection("cricketers").findOne({ _id: new ObjectId(req.params.id) });

        if (!player) return res.status(404).json({ message: "Player not found" });
        res.json(player);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    } finally {
        await client.close();
    }
};