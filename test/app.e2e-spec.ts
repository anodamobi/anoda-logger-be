import { Test, TestingModule } from '@nestjs/testing';
import {
    ClassSerializerInterceptor,
    HttpStatus,
    INestApplication,
    ValidationPipe,
    VersioningType,
} from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Reflector } from '@nestjs/core';
import { config } from 'dotenv';
import faker from '@faker-js/faker';
import mongoose from 'mongoose';

config();

describe('AppController (e2e)', () => {
    let app: INestApplication;
    const myConfig = {
        jwt:     undefined,
        traceId: undefined,
        context: undefined,
        env:     undefined,
        project: 'test',
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await  Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = await moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({
            skipMissingProperties:   true,
            skipNullProperties:      false,
            skipUndefinedProperties: true,
            errorHttpStatusCode:     HttpStatus.UNPROCESSABLE_ENTITY,
            transform:               true,
            whitelist:               true,
        }));

        app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

        app.enableVersioning({
            type: VersioningType.URI,
        });

        await app.init();
    });

    afterAll(async () => {
        await app.close();

        await mongoose.disconnect();
    });

    describe('Check env', function () {
        it('Check env', async () => {
            expect(process.env.PORT).toBeTruthy();
            expect(process.env.API_KEY).toBeTruthy();
            expect(process.env.DATABASE).toBeTruthy();
            expect(process.env.PROJECTS).toBeTruthy();
            expect(process.env.JWT_TTL).toBeTruthy();
            expect(process.env.JWT_PRIVATE_KEY).toBeTruthy();
        });
    });

    describe('Auth Controller', function () {
        it('GET /auth', async () => {
            const res = await request(app.getHttpServer())
                .get('/auth')
                .set('x-access-token', `${process.env.API_KEY}`);

            myConfig.jwt = res.body.auth.jwt;

            expect(res.status).toBe(200);
            expect(res.body).toStrictEqual({
                auth: {
                    jwt:       expect.any(String),
                    expiresIn: expect.any(Number),
                },
            });
        });
    });

    describe('Logger Controller', function () {
        it('GET /logger/projects', async () => {
            const res = await request(app.getHttpServer())
                .get('/logger/projects')
                .set('Authorization', `Bearer ${myConfig.jwt}`);

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                projects: expect.arrayContaining([expect.any(String)]),
            });
        });

        it('POST /logger', async () => {
            const body = {
                project: myConfig.project,
                logData: [{
                    traceId:   faker.datatype.string(),
                    context:   faker.datatype.string(),
                    timestamp: faker.date.future().toISOString(),
                    message:   faker.datatype.string(),
                    env:       faker.datatype.string(),
                },
                {
                    traceId:   faker.datatype.string(),
                    context:   faker.datatype.string(),
                    timestamp: faker.date.future().toISOString(),
                    message:   faker.datatype.string(),
                    env:       faker.datatype.string(),
                }],
            };

            myConfig.traceId = body.logData[0].traceId;
            myConfig.context = body.logData[0].context;
            myConfig.env = body.logData[0].env;

            const res = await request(app.getHttpServer())
                .post('/logger')
                .set('x-access-token', `${process.env.API_KEY}`)
                .send(body);

            expect(res.status).toBe(201);
            expect(res.text).toEqual('Created');
        });

        it('GET /logger', async () => {
            const query = {
                traceId: myConfig.traceId,
                env:     myConfig.env,
                context: myConfig.context,
                project: myConfig.project,
                page:    1,
                limit:   25,
            };
            const res = await request(app.getHttpServer())
                .get('/logger')
                .set('Authorization', `Bearer ${myConfig.jwt}`)
                .query(query);

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                pagination: {
                    total: expect.any(Number),
                    page:  expect.any(Number),
                    limit: expect.any(Number),
                },
                data: expect.arrayContaining([expect.objectContaining({
                    _id:       expect.any(Object),
                    context:   expect.any(String),
                    message:   expect.any(String),
                    traceId:   expect.any(String),
                    timestamp: expect.any(String),
                    env:       expect.any(String),
                })]),
            });
        });
    });
});
