const express = require("express");
const authMiddlewares = require("../middleware/auth");
const authzMiddlewares = require("../middleware/authz");

const {
  createNewJob,
  getAllJobs,
  getJobBySearch,
  getJobById,
  updateJobById,
  deleteJobById,
  getJobByFilter,
  getJobBySalary,
} = require("../controllers/jobControllers");

const { applyJob , GetAllApplyJobs , GetApplyJobsById} = require("../controllers/applyControllers");

const jobRouter = express.Router();

jobRouter.post(
  "/",
  authMiddlewares,
  authzMiddlewares("CREATE_JOBS"),
  createNewJob
);
jobRouter.get("/", authMiddlewares, getAllJobs);
jobRouter.get("/byId/:id", getJobById);
jobRouter.get("/search", getJobBySearch);
jobRouter.get("/filter/:criteria", getJobByFilter);
jobRouter.get("/filter/:min/:max", getJobBySalary);
jobRouter.put(
  "/update/:id",
  authMiddlewares,
  authzMiddlewares("UPDATE_JOBS"),
  updateJobById
);
jobRouter.delete(
  "/delete/:id",
  authMiddlewares,
  authzMiddlewares("DELETE_JOBS"),
  deleteJobById
);

jobRouter.post(
  "/:jobId/apply",
  authMiddlewares,
  authzMiddlewares("SEND-APPLICATIONS"),
  applyJob
);

jobRouter.get(
  "/apply",
  authMiddlewares,
  authzMiddlewares("GET-APPLICATIONS"),
  GetAllApplyJobs
);


jobRouter.get(
  "/:id/applications",
  authMiddlewares,
  authzMiddlewares("GET-USER-APPLICATIONS"),
  GetApplyJobsById
);

module.exports = jobRouter;
