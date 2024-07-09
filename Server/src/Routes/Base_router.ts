import { Router } from "express";
import { user_router } from "./user_routes";
import { job_router } from "./job_router";

export const base_router: Router = Router();

// Forward the /user route to the user_router
base_router.use("/user", user_router);
base_router.use("/job",job_router);
