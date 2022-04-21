import { Test, TestingModule } from '@nestjs/testing';
import { LoggerController } from './logger.controller';
import { LoggerRepository } from './logger.repository';

describe('LoggerController', () => {
    let controller: LoggerController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LoggerController],
            providers:   [LoggerRepository],
        }).compile();

        controller = module.get<LoggerController>(LoggerController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
