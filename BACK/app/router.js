/* Router initialization */
const express = require("express");
const router = express.Router();

/* Controllers import */
const mainController = require('./controllers/mainController.js');
const projectController = require('./controllers/projectController.js');
const promoController = require('./controllers/promoController.js');
const userController = require('./controllers/userController.js');



/****** All roads ******/

/**
 * Preconfigue l'application 
 * @route GET /
 * @group 
 * @returns {object} 200 - 
 * @returns {Error}  default - Une erreur est survenue
 */
router.get("/", mainController.homePage);
router.get("/projects", projectController.getAllProjects);
// router.get("/project/:id", projectController.getOneProject);
router.get("/promos", promoController.getAllPromos);
// router.get("/promo/:id", promoController.getOnePromo);
router.get("/students", userController.getAllStudents);
//  router.get("/student/:id", userController.getOneStudent);




/* Exportation of router */
 module.exports = router;