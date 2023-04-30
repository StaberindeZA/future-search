import { Test, TestingModule } from '@nestjs/testing';
import { SearchesResolver } from './searches.resolver';
import { SearchesService } from './searches.service';

describe('SearchesResolver', () => {
  let resolver: SearchesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchesResolver, SearchesService],
    }).compile();

    resolver = module.get<SearchesResolver>(SearchesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
