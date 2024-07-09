import {Router} from "express";
import {createjob, findjobs} from "../Controllers/job_controller"

export const job_router=Router();

job_router.route("/createjob").post(createjob);
job_router.route("/findjobs").post(findjobs);
