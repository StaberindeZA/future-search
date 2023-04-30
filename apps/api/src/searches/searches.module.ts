import { Module } from '@nestjs/common';
import { SearchesService } from './searches.service';
import { SearchesResolver } from './searches.resolver';

@Module({
  providers: [SearchesResolver, SearchesService],
})
export class SearchesModule {}
