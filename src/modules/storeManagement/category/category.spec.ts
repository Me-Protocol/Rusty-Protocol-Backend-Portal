/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { CategoryService } from '@src/globalServices/category/category.service';
import { CreateCategoryDto } from './dto/CreateCategoryDto';
import { UpdateCategoryDto } from './dto/UpdateCategoryDto';
import { FilterCategoryDto } from '@src/modules/storeManagement/category/dto/FilterCategoryDto';
import { CategoryManagementService } from './service';
import { CategoryType } from '@src/utils/enums/CategoryType';

describe('CategoryManagementService', () => {
  let service: CategoryManagementService;
  let categoryService: CategoryService;

  const createCategoryDto: CreateCategoryDto = {
    name: 'Existing Category',
    description: 'description',
    image: 'image',
    banner: 'banner',
    type: CategoryType.BRAND,
    parentId: 'parentId',
    slug: 'slug',
    // Add other required properties of CreateCategoryDto
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryManagementService,
        {
          provide: CategoryService,
          useValue: {
            findOneByName: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryManagementService>(CategoryManagementService);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('createCategory', () => {
    it('should create a category successfully', async () => {
      jest.spyOn(categoryService, 'findOneByName').mockResolvedValue(null);
      jest
        .spyOn(categoryService, 'create')
        // @ts-ignore
        .mockResolvedValue(createCategoryDto);

      const result = await service.createCategory(createCategoryDto);

      expect(categoryService.findOneByName).toHaveBeenCalledWith(
        createCategoryDto.name,
      );
      expect(categoryService.create).toHaveBeenCalledWith(createCategoryDto);
      expect(result).toEqual(createCategoryDto);
    });

    it('should throw an HttpException when the category already exists', async () => {
      jest
        .spyOn(categoryService, 'findOneByName')
        // @ts-ignore
        .mockResolvedValue(createCategoryDto);

      await expect(
        service.createCategory(createCategoryDto),
      ).rejects.toThrowError(
        new HttpException('Category already exists', 400, {
          cause: new Error('Category already exists'),
        }),
      );
    });
  });

  describe('updateCategory', () => {
    it('should update a category successfully', async () => {
      const categoryId = 'categoryId123';
      const updateCategoryDto: UpdateCategoryDto = {
        ...createCategoryDto,
        name: 'Updated Category',
      };

      const existingCategory = {
        id: categoryId,
        name: 'Existing Category',
        // Add other properties of the existing category
      };

      jest.spyOn(categoryService, 'findOneByName').mockResolvedValue(null);
      jest
        .spyOn(categoryService, 'findOneByName')
        // @ts-ignore
        .mockResolvedValue(existingCategory);
      // @ts-ignore
      jest.spyOn(categoryService, 'update').mockResolvedValue(existingCategory);

      const result = await service.updateCategory(
        categoryId,
        updateCategoryDto,
      );

      expect(categoryService.findOneByName).toHaveBeenCalledWith(
        updateCategoryDto.name,
      );
      expect(categoryService.update).toHaveBeenCalledWith(
        categoryId,
        updateCategoryDto,
      );
      expect(result).toEqual(existingCategory);
    });

    it('should throw an HttpException when the updated category name already exists for a different category', async () => {
      const categoryId = 'categoryId123';
      const updateCategoryDto: UpdateCategoryDto = {
        ...createCategoryDto,
        name: 'Duplicate Category',
      };

      const existingCategory = {
        id: 'anotherCategoryId',
        name: 'Duplicate Category',
        // Add other properties of the existing category
      };

      jest
        .spyOn(categoryService, 'findOneByName')
        // @ts-ignore
        .mockResolvedValue(existingCategory);

      await expect(
        service.updateCategory(categoryId, updateCategoryDto),
      ).rejects.toThrowError(
        new HttpException('Category already exists', 400, {
          cause: new Error('Category already exists'),
        }),
      );
    });
  });

  describe('findAllCategory', () => {
    it('should return all categories', async () => {
      // @ts-ignore
      const filterCategoryDto: FilterCategoryDto = {
        // Add filter properties
      };

      const expectedCategories = [
        { id: '1', name: 'Category 1' },
        { id: '2', name: 'Category 2' },
        // Add more categories as needed
      ];

      jest
        .spyOn(categoryService, 'findAll')
        // @ts-ignore
        .mockResolvedValue(expectedCategories);

      const result = await service.findAllCategory(filterCategoryDto);

      expect(categoryService.findAll).toHaveBeenCalledWith(filterCategoryDto);
      expect(result).toEqual(expectedCategories);
    });
  });
});
