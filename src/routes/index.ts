import { Router } from "express";
import { Auth } from "../middlewares/Auth";
import { 
    authorSigninController, 
    authorSignupController, 
    createNewsController, 
    deleteNewsController, 
    editNewsController, 
    listNewsController,
    readOneNewsController
} from "../controllers";

const auth = new Auth();

const router = Router()

router.post('/author/signup', authorSignupController.signup)
router.post('/author/signin', authorSigninController.signin)

router.get('/news', listNewsController.read)
router.get('/news/:id', readOneNewsController.readOneNews)
router.post('/news', auth.verifyToken, createNewsController.create)
router.put('/news/:id', auth.verifyToken, editNewsController.editNews)
router.delete('/news/:id', auth.verifyToken, deleteNewsController.deleteNews)

export { router }