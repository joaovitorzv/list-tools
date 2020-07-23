import { getRepository } from 'typeorm';

import Tool from '../models/Tool';
//import CreateTagService from './CreateTagService';

import AppError from '../errors/AppError';

interface Request {
  title: string;
  tags: string[];
  link: string;
  description: string;
}

class CreateToolService {
  public async execute({
    title,
    tags,
    link,
    description
  }: Request): Promise<Tool> {
    const toolRepository = getRepository(Tool);

    const tool = toolRepository.create({
      title,
      description,
      link,
      tags,
    });

    await toolRepository.save(tool);

    return tool;
  }
}

export default CreateToolService;