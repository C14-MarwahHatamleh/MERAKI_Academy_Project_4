const express = require("express");
const authMiddlewares = require("../middleware/auth")
const authzMiddlewares = require("../middleware/authz")

const {
    createNewJob,
    getAllJobs,
    getJobByTitle,
    updateJobById,
    deleteJobById,
    getJobByFilter,

} = require("../controllers/jobControllers");
const jobRouter = express.Router();

jobRouter.post("/", authMiddlewares ,authzMiddlewares("CREATE_JOBS"), createNewJob);
jobRouter.get("/", authMiddlewares ,getAllJobs);
jobRouter.get("/search/:title", getJobByTitle);
jobRouter.get("/filter/:criteria", getJobByFilter);
jobRouter.put("/update/:id",authMiddlewares ,authzMiddlewares("UPDATE_JOBS"), updateJobById);
jobRouter.delete("/delete/:id",authMiddlewares ,authzMiddlewares("DELETE_JOBS"), deleteJobById);




module.exports = jobRouter;
