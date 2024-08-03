import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserType } from 'src/constant';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    it('should call userService.create with correct parameters', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@gmail.com',
        firstName: 'test',
        lastName: 'test',
        userType: UserType.ADMIN,
      };
      await userController.create(createUserDto);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should call userService.findAll', async () => {
      await userController.findAll();
      expect(userService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call userService.findOne with correct id', async () => {
      const id = 'some-id';
      await userController.findOne(id);
      expect(userService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should call userService.update with correct parameters', async () => {
      const id = 'some-id';
      const updateUserDto: UpdateUserDto = {
        /* fill with appropriate test data */
      };
      await userController.update(id, updateUserDto);
      expect(userService.update).toHaveBeenCalledWith(id, updateUserDto);
    });
  });
});
