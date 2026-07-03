import { Router } from "express";
import { commentController } from "./comment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";


const router = Router();

router.post('/', auth(Role.ADMIN, Role.USER, Role.AUTHOR), commentController.createComment);
router.get('/author/:authorId', commentController.getCommentsByAuthorId);
router.post('/:commentId/moderate', auth(Role.ADMIN), commentController.moderateComment);
router.get('/:postId', commentController.getCommentByPostId);
router.patch('/:commentId', auth(Role.ADMIN, Role.USER, Role.AUTHOR), commentController.updateComment);
router.delete('/:commentId', auth(Role.ADMIN, Role.USER, Role.AUTHOR), commentController.deleteComment);





export const commentRoutes = router;