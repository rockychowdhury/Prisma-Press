import { Router } from "express";
import { postController } from "./post.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";


const router = Router();

router.post('/', auth(Role.AUTHOR, Role.USER, Role.ADMIN), postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/my-posts', auth(Role.USER, Role.AUTHOR, Role.ADMIN), postController.getMyPosts);
router.get('/stats', auth(Role.ADMIN), postController.generatePostStats);
router.get('/:postId', postController.getPostById);
router.patch('/:postId', auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.updatePost);
router.delete('/:postId', auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.deletePost);





export const postRoutes = router;