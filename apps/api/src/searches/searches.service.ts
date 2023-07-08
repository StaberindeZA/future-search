import { Injectable } from '@nestjs/common';
import { CreateSearchInput } from './dto/create-search.input';
import { UpdateSearchInput } from './dto/update-search.input';
import { FindAllSearchInput } from './dto/find-all-search.input';
import { PrismaService } from '../db/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class SearchesService {
  constructor(private prisma: PrismaService) {}

  async create(createSearchInput: CreateSearchInput) {
    const { userId: id, email, search, searchDate } = createSearchInput;
    let user: User;

    if (id) {
      user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
    } else if (email) {
      user = await this.prisma.user.findUniqueOrThrow({ where: { email } });
    } else {
      // This error should not occur as class-validator should prevent.
      throw new Error('Must provide id or email.');
    }

    if (email && email !== user.email) {
      throw new Error('Input email does not match user');
    }

    return {
      id: user.id,
      search,
      searchDate,
      status: 'NEW',
      createdAt: user.createdAt,
    };
  }

  findAll(findAllSearchInput: FindAllSearchInput) {
    return [];
  }

  findOne(id: string) {
    return `This action returns a #${id} search`;
  }

  update(id: string, updateSearchInput: UpdateSearchInput) {
    return `This action updates a #${id} search`;
  }

  remove(id: string) {
    return `This action removes a #${id} search`;
  }
}
