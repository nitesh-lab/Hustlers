import { Router } from "express";
import { user_router } from "./user_routes";

export const base_router: Router = Router();

// Forward the /user route to the user_router
base_router.use("/user", user_router);
