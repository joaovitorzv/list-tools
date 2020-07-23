import { getRepository } from 'typeorm';

import Tool from '../models/Tool';

import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteToolService {
  public async execute({ id }: Request): Promise<void> {
    const toolRepository = getRepository(Tool);

    const tool = await toolRepository.findOne({ where: { id } });

    if (!tool) {
      throw new AppError('Tool not found')
    }

    await toolRepository.delete(id);
  }

}

export default DeleteToolService;