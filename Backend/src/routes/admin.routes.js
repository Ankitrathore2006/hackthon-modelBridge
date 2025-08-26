import express from "express";
import { createApiKey, deleteApiKey, deleteAdmin, getApiKeys ,getLogs,getLogsById,getAllApiKeys} from "../controllers/admin.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/create-api-key", protectRoute, createApiKey);
router.post("/api-keys", protectRoute, getApiKeys);
router.post("/delete-api-key", protectRoute, deleteApiKey);
router.post("/delete-admin", protectRoute, deleteAdmin);
router.post("/get-logs-ById", protectRoute, getLogsById);



router.get("/getAll-keys", protectRoute, getAllApiKeys);
router.get("/get-logs", protectRoute, getLogs);

export default router;
