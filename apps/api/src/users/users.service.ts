import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { usersMock } from '../db/mock';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  users = usersMock;

  async create(createUserInput: CreateUserInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: createUserInput.email },
    });

    if (user) {
      return user;
    }

    return this.prisma.user.create({
      data: {
        ...createUserInput,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({
      data: { ...updateUserInput },
      where: { id },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
