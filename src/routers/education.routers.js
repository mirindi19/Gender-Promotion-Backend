import { Router } from "express";
import educationCollectionController from "../controllers/EducationCollectionController";
import verifyToken from "../middelwares/verifyToken";
const router = Router();
router.post("/education",verifyToken,educationCollectionController.addEducationCollection);
router.get("/educationCollection",educationCollectionController.getEducationCollection);
export default router