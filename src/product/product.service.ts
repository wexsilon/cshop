import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findOneById(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  findAll() {
    return this.productRepository.find({});
  }

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(
      this.productRepository.create(createProductDto),
    );
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  delete(id: number) {
    return this.productRepository.delete(id);
  }
}
