import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { SearchesService } from './searches.service';
import { Search } from './entities/search.entity';
import { CreateSearchInput } from './dto/create-search.input';
import { UpdateSearchInput } from './dto/update-search.input';
import { FindAllSearchInput } from './dto/find-all-search.input';
import { FindOneSearchInput } from './dto/find-one-search.input';

@Resolver(() => Search)
export class SearchesResolver {
  constructor(private readonly searchesService: SearchesService) {}

  @Mutation(() => Search)
  createSearch(
    @Args('createSearchInput') createSearchInput: CreateSearchInput
  ) {
    return this.searchesService.create(createSearchInput);
  }

  @Query(() => [Search], { name: 'searches' })
  findAll(@Args('findAllSearchInput') findAllSearchInput: FindAllSearchInput) {
    return this.searchesService.findAll(findAllSearchInput);
  }

  @Query(() => Search, { name: 'search' })
  findOne(@Args('findOneSearchInput') findOneSearchInput: FindOneSearchInput) {
    return this.searchesService.findOne(findOneSearchInput);
  }

  @Mutation(() => Search)
  updateSearch(
    @Args('updateSearchInput') updateSearchInput: UpdateSearchInput
  ) {
    return this.searchesService.update(updateSearchInput.id, updateSearchInput);
  }

  @Mutation(() => Search)
  removeSearch(
    @Args('removeSearchInput') removeSearchInput: FindOneSearchInput
  ) {
    return this.searchesService.remove(removeSearchInput);
  }
}
