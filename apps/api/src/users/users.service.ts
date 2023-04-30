import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { usersMock } from '../db/mock';

@Injectable()
export class UsersService {
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

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.findUserbyId(id);
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    const user = this.findUserbyId(id);

    if (!user) {
      throw new Error(`Could not find user for id: ${id}`);
    }

    const index = this.users.findIndex((user) => user.id === id);
    const updatedUser = {
      ...user,
      ...updateUserInput,
      updatedAt: new Date().toDateString(),
    };
    this.users[index] = updatedUser;

    return updatedUser;
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
