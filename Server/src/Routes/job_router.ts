import {Router} from "express";
import createjob from "../Controllers/job_controller"


export const job_router=Router();

job_router.route("/createjob").post(createjob);
