const express = require("express");
const controllers = require("../app/controllers");
const validation = require("../app/validation");
const auth = require("../app/auth");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const apiRouter = express.Router();

// API swagger
apiRouter.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Login Register
apiRouter.post("/login", controllers.Akun.login);
apiRouter.post("/register", controllers.Akun.createAkun);

// Akun
apiRouter.get("/my-profile", auth.authorize, controllers.Akun.show);
apiRouter.put("/update-profile", auth.authorize, controllers.Akun.update);
apiRouter.put(
  "/update-password",
  auth.authorize,
  controllers.Akun.updatePassword
);
apiRouter.delete("/delete-akun", auth.authorize, controllers.Akun.destroy);

// Worker
apiRouter.get("/list-worker", controllers.Akun.listWorker);
apiRouter.get("/detail-worker/:id", controllers.Akun.detailWorker);

// Skill
apiRouter.post("/add-skill", auth.authorize, controllers.Skill.create);
apiRouter.delete(
  "/delete-skill/:id",
  auth.authorize,
  controllers.Skill.destroy
);

// Job
apiRouter.get("/all-job", controllers.Job.list);
apiRouter.get("/detail-job/:id", controllers.Job.showOne);
apiRouter.get("/my-job", auth.authorize, controllers.Job.showJobUser);
apiRouter.post("/create-job", auth.authorize, controllers.Job.create);
apiRouter.put("/update-job/:id", auth.authorize, controllers.Job.update);
apiRouter.delete("/delete-job/:id", auth.authorize, controllers.Job.destroy);

// Question
apiRouter.post("/create-question", auth.authorize, controllers.Question.create);

// Answer
apiRouter.post("/create-answer", auth.authorize, controllers.Answer.create);

// Applicant
apiRouter.get(
  "/my-applicant",
  auth.authorize,
  controllers.Applicant.showApplicantUser
);
apiRouter.post("/apply-job", auth.authorize, controllers.Applicant.create);

// Review
apiRouter.get("/list-review/:id", controllers.Review.list);
apiRouter.post("/create-review", auth.authorize, controllers.Review.create);

// Admin
apiRouter.get(
  "/list-akun",
  auth.authorize,
  validation.admin,
  controllers.Akun.list
);
apiRouter.delete(
  "/delete-akun-by-admin/:id",
  auth.authorize,
  validation.admin,
  controllers.Akun.destroyByAdmin
);
apiRouter.put(
  "/update-password-by-admin/:id",
  auth.authorize,
  validation.admin,
  controllers.Akun.updatePasswordByAdmin
);

module.exports = apiRouter;
