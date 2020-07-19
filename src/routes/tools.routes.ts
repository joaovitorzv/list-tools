import { Router } from 'express';

const toolsRouter = Router();

toolsRouter.get('/', (request, response) => {
  return response.json({ working: true });
})

export default toolsRouter;