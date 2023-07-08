import { Module } from '@nestjs/common';
import { SearchesService } from './searches.service';
import { SearchesResolver } from './searches.resolver';
import { PrismaService } from '../db/prisma.service';

@Module({
  providers: [SearchesResolver, SearchesService, PrismaService],
})
export class SearchesModule {}
