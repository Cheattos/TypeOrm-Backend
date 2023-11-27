import * as express from "express";
import * as path from "path";
import BlogController from "../controller/BlogController";
import PaslonController from "../controller/PaslonController";
import PartaiController from "../controller/PartaiController";
import VoterController from "../controller/VoterController";
import UserController from "../controller/UserController";
import upload from "../middleware/MulterMiddleware";
import AuthMiddleware from "../middleware/AuthMiddleware";
import RoleMiddleware from "../middleware/RoleMiddleware";

const router = express.Router();

// blog
router.get('/blog', AuthMiddleware.AuthTi, BlogController.find);
router.get('/blog/:id', AuthMiddleware.AuthTi, BlogController.findById);
router.post('/addblog', AuthMiddleware.AuthTi, RoleMiddleware('admin'), upload.single(' blog_cover'), BlogController.create);
router.put('/updateblog/:id', AuthMiddleware.AuthTi, RoleMiddleware('admin'), upload.single(' blog_cover'), BlogController.update);
router.delete('/deleteblog/:id', AuthMiddleware.AuthTi, RoleMiddleware('admin'), BlogController.delete);

// Paslon
router.get('/paslon', AuthMiddleware.AuthTi, PaslonController.find);
router.get('/paslon/:id', AuthMiddleware.AuthTi, PaslonController.findById);
router.post('/addpaslon', AuthMiddleware.AuthTi, RoleMiddleware('admin'), upload.single('Paslon_photo'), PaslonController.create);
router.put('/updatepaslon/:id', AuthMiddleware.AuthTi, RoleMiddleware('admin'), upload.single('Paslon_photo'), PaslonController.update);
router.delete('/deletepaslon/:id', AuthMiddleware.AuthTi, RoleMiddleware('admin'), PaslonController.delete);

// Partai
router.get('/partai', AuthMiddleware.AuthTi, PartaiController.find);
router.get('/partai/:id', AuthMiddleware.AuthTi, PartaiController.findById);
router.post('/addpartai', AuthMiddleware.AuthTi, RoleMiddleware('admin'), upload.single('Partai_logos'), PartaiController.create);
router.put('/updatepartai/:id', AuthMiddleware.AuthTi, RoleMiddleware('admin'), upload.single('Partai_logos'), PartaiController.update);
router.delete('/deletepartai/:id', AuthMiddleware.AuthTi, RoleMiddleware('admin'), PartaiController.delete);

// Voter
router.get('/voter', AuthMiddleware.AuthTi, VoterController.find);
router.get('/voter/:id', AuthMiddleware.AuthTi, VoterController.findById);
router.post('/addvoter', AuthMiddleware.AuthTi, VoterController.create);
router.put('/updatevoter/:id', AuthMiddleware.AuthTi, VoterController.update);
router.delete('/deletevoter/:id', AuthMiddleware.AuthTi, VoterController.delete);

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/User", UserController.find)
router.get("/logout", AuthMiddleware.logout)

// Serve uploaded files statically
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

export default router;
