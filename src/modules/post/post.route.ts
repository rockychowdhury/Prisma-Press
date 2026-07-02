import { Router } from "express";
import { postController } from "./post.controller";


const router = Router();

router.get('/', postController.getPostList);
router.get('/stats', postController.generateUserPostStats);
router.get('/my-posts', postController.getMyPosts);
router.get('/:postId', postController.getPostDetails);
router.post('/', postController.createPost);
router.patch('/:postId', postController.updatePost);
router.delete('/:postId', postController.deletePost);





export const postRoutes = router;