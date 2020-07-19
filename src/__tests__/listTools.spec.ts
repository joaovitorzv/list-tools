import request from 'supertest';
import { getConnection, getRepository, Connection } from 'typeorm';
import createConnection from '../database';

import Tool from '../models/Tool';
import Tag from '../models/Tag';

import app from '../app';

let connection: Connection;

describe('ListTools', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');


    await connection.query('DROP TABLE IF EXISTS tools');
    await connection.query('DROP TABLE IF EXISTS tags');
    await connection.query('DROP TABLE IF EXISTS migrations');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM tools');
    await connection.query('DELETE FROM tags');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });


  it('Should be able to list all tools', async () => {
    await request(app).post('/tools').send({
      title: 'json-server',
      link: 'https://github.com/typicode/json-server',
      description: 'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
      tags: [
        "api",
        "json",
        "schema",
        "node",
        "github",
        "rest"
      ],
    });

    await request(app).post('/tools').send({
      title: "fastify",
      link: "https://www.fastify.io/",
      description: "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
      tags: [
        "web",
        "framework",
        "node",
        "http2",
        "https",
        "localhost"
      ],
    });

    const response = await request(app).get('/tools');

    expect(response.body).toHaveLength(2);
    expect(response.body[1]).toMatchObject({
      title: "fastify",
      link: "https://www.fastify.io/",
      description: "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
      tags: [
        "web",
        "framework",
        "node",
        "http2",
        "https",
        "localhost"
      ],
    })
  });

  it('Should be able to create a new tool', async () => {
    const toolsRepository = getRepository(Tool);

    const response = await request(app).post('/tools').send({
      title: 'json-server',
      link: 'https://github.com/typicode/json-server',
      description: 'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
      tags: [
        "api",
        "json",
        "schema",
        "node",
        "github",
        "rest"
      ],
    });

    const tool = await toolsRepository.findOne({
      where: {
        title: 'json-server',
      },
    });

    expect(tool).toBeTruthy();

    expect(response.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(Number)
      }),
    );
  });
})