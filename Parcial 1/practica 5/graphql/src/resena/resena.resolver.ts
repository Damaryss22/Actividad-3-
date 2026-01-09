import { Resolver, Query, Args } from '@nestjs/graphql';
import { ResenaService } from './resena.service';
import { Resena } from './entities/resena.entity';

@Resolver(() => Resena)
export class ResenaResolver {
  constructor(private readonly resenaService: ResenaService) {}

  @Query(() => [Resena], { name: 'resenas' })
  findAll() {
    return this.resenaService.findAll();
  }

  @Query(() => Resena, { name: 'resena', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.resenaService.findOne(id);
  }
}
