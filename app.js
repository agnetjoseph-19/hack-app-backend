const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://agnet:agnet19@ac-noeplyt-shard-00-00.exoivte.mongodb.net:27017,ac-noeplyt-shard-00-01.exoivte.mongodb.net:27017,ac-noeplyt-shard-00-02.exoivte.mongodb.net:27017/teamdb?ssl=true&replicaSet=atlas-itatbn-shard-0&authSource=admin&appName=Cluster0").then(
    () => {
        console.log("mongodb connected")
    }
).catch(
    (error) => {
        console.log(error)
    }
)

const Team=mongoose.model("Teams",new mongoose.Schema(
    {
        teamId: String,
        teamName: String,
        teamLeader: String,
        leaderEmail: String,
        leaderPhone: String,
        collegeName: String,
        numberOfMembers: String,
        projectTitle: String,
        problemStatementTrack: String,
        technologyStack: String,
        mentorName: String,
        registrationDate: String,
        tableStationNumber: String
    }
))

app.get("/view-team",async(req,res)=> {
    const teams=await Team.find()
    res.json(teams);
});

app.post("/add-team",async (req,res) => {
    await Team.create(req.body)
    res.json({"status":"success"});
});

app.listen(3000, ()=> {
    console.log("server started")
});