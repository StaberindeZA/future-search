import { Injectable } from '@nestjs/common';
import { CreateSearchInput } from './dto/create-search.input';
import { UpdateSearchInput } from './dto/update-search.input';
import { FindAllSearchInput } from './dto/find-all-search.input';
import { PrismaService } from '../db/prisma.service';
import { User } from '@prisma/client';
import { FindOneSearchInput } from './dto/find-one-search.input';

@Injectable()
export class SearchesService {
  constructor(private prisma: PrismaService) { }

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

    return this.prisma.search.create({
      data: {
        search,
        searchDate,
        status: 'NEW',
        userId: user.id,
      },
    });
  }

  async findAll(findAllSearchInput: FindAllSearchInput) {
    // Temporary solution
    // TODO make one DB call
    let userId: string;
    if (!userId) {
      const user = await this.prisma.user.findUniqueOrThrow({ where: { email: findAllSearchInput.email } });
      userId = user.id;
    } else {
      userId = findAllSearchInput.userId;
    }

    return this.prisma.search.findMany({
      where: { userId },
    });
  }

  async findOne(findOneSearchInput: FindOneSearchInput) {
    return this.prisma.search.findUniqueOrThrow({
      where: { id: findOneSearchInput.searchId },
    });
  }

  update(id: string, updateSearchInput: UpdateSearchInput) {
    return `This action updates a #${id} search`;
  }

  async remove(findOneSearchInput: FindOneSearchInput) {
    return this.prisma.search.delete({
      where: { id: findOneSearchInput.searchId },
    });
  }
}
