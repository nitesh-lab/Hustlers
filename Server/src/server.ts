import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";

import { base_router } from "./Routes/Base_router";
import { ConnectDB } from "./utils/mongoConnect";

const app=express();

app.use(cors({
    origin:"*",
    credentials:true,
}));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit: '50mb'}));

app.use("/api",base_router);

ConnectDB().then(()=>{
    app.listen(8000,()=>{
        console.log("listening to port 8000")
    })
})
