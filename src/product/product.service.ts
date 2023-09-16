import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { NotFoundProduct, UniqueProductName } from './responses/error-response';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findOneById(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (product) return product;
    throw new NotFoundProduct();
  }

  findAll() {
    return this.productRepository.find({});
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productRepository.save(createProductDto);
    } catch (e) {
      throw new UniqueProductName();
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      await this.productRepository.update(id, updateProductDto);
    } catch (e) {
      throw new UniqueProductName();
    }
    return this.findOneById(id);
  }

  async delete(id: number) {
    const deletedProduct = await this.findOneById(id);
    this.productRepository.delete(id);
    return deletedProduct;
  }
}
