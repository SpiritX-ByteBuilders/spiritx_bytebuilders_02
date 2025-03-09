const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Replace with your actual MongoDB connection string
const client = new MongoClient(uri);
const dbName = "Spirit11"; // Replace with your actual database name

exports.getTournamentSummary = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const players = await db.collection("cricketers").find().toArray();

    const overallRuns = players.reduce(
      (acc, player) => acc + player["Total Runs"],
      0
    );
    const overallWickets = players.reduce(
      (acc, player) => acc + player.Wickets,
      0
    );

    const highestRunScorer = players.reduce(
      (max, player) =>
        player["Total Runs"] > max["Total Runs"] ? player : max,
      players[0]
    );
    const highestWicketTaker = players.reduce(
      (max, player) => (player.Wickets > max.Wickets ? player : max),
      players[0]
    );

    res.json({
      overallRuns,
      overallWickets,
      highestRunScorer: highestRunScorer.Name,
      highestWicketTaker: highestWicketTaker.Name,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  } finally {
    await client.close();
  }
};
