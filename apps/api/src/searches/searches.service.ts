import { Injectable } from '@nestjs/common';
import { CreateSearchInput } from './dto/create-search.input';
import { UpdateSearchInput } from './dto/update-search.input';
import { searchesMock } from '../db/mock';
import { FindAllSearchInput } from './dto/find-all-search.input';

@Injectable()
export class SearchesService {
  searches = searchesMock;

  create(createSearchInput: CreateSearchInput) {
    return 'This action adds a new search';
  }

  findAll(findAllSearchInput: FindAllSearchInput) {
    return this.searches.filter(
      (search) => search.userId === findAllSearchInput.userId
    );
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
