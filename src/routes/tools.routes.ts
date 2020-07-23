import { Router, request } from 'express';

import { getRepository, In, Any } from 'typeorm';
import Tool from '../models/Tool';

import CreateToolService from '../services/CreateToolService';
import DeleteToolService from '../services/DeleteToolService';

const toolsRouter = Router();

toolsRouter.get('/', async (request, response) => {
  if (request.query && request.query.tag) {
    var tag = (request.query as any).tag
  }

  const toolsRepository = getRepository(Tool);

  const tools = await toolsRepository.find();

  if (!tag) {
    return response.json(tools);
  }

  const filteredTools = tools.filter((tool) => {
    return tool.tags.includes(tag);
  })

  return response.json(filteredTools);
})

toolsRouter.post('/', async (request, response) => {
  const { title, link, description, tags } = request.body;

  const createToolService = new CreateToolService();
  await createToolService.execute({
    title,
    link,
    description,
    tags
  });

  return response.status(201).send();
});

toolsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteToolService = new DeleteToolService();

  await deleteToolService.execute({ id });

  return response.status(204).send();
})



export default toolsRouter;