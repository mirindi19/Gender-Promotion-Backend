import { Router } from "express";
import collectionController from "../controllers/collectionController";
import verifyToken from "../middelwares/verifyToken";
const router = Router();
router.post("/collection",verifyToken,collectionController.addCollectionController)
router.get("/collection",collectionController.getCollectionEmp);
export default router