import { Router } from "express";
import { commentController } from "./comment.controller";


const router = Router();

router.get('/author/:authorId', commentController.getAuthorComments);
router.get('/:commentId', commentController.getCommentDetails);
router.post('/', commentController.createComment);
router.post('/:commentId/moderate', commentController.moderateComment);
router.patch('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);





export const commentRoutes = router;