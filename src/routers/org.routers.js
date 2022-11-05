import { Router } from "express";
import orgController from "../controllers/orgController";

const router = Router();

router.post("/AddOrganisation",orgController.addOrganisation);
router.get("/getOrganisation",orgController.getOrganization);
router.get("/organizationbyId",orgController.findOrgCollectionByCUserId);
router.get("/educationCollectionbyOrgId",orgController.findOrgEducationCollectionByCUserId);
export default router