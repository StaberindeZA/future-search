import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { usersMock } from '../db/mock';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  users = usersMock;

  create(createUserInput: CreateUserInput) {
    const user = {
      ...createUserInput,
      id: this.generateUserId(),
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    };
    this.users.push(user);
    return user;
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

  private generateUserId() {
    return `${this.users.length + 1}`;
  }

  private findUserbyId(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
