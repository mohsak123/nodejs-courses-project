const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const courseController = require("../controllers/courses.controller");
const { validationSchema } = require("../middlewares/validationSchema");
const verifyToken = require("../middlewares/verifyToken");
const userRole = require("../utils/user-roles");
const allowedTo = require("../middlewares/allowedTo");

router
  .route("/")
  .get(courseController.gatAllCourses)
  .post(
    verifyToken,
    allowedTo(userRole.MANAGER),
    validationSchema(),
    courseController.addCourse
  );

router
  .route("/:courseId")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(
    verifyToken,
    allowedTo(userRole.ADMIN, userRole.MANAGER),
    courseController.deleteCourse
  );

module.exports = router;
