import { Resolver, Query, Args } from '@nestjs/graphql';
import { LugaresTuristicosService } from './lugares-turisticos.service';
import { LugaresTuristico } from './entities/lugares-turistico.entity';

@Resolver(() => LugaresTuristico)
export class LugaresTuristicosResolver {
  constructor(private readonly lugaresTuristicosService: LugaresTuristicosService) {}

  @Query(() => [LugaresTuristico], { name: 'lugaresTuristicos' })
  findAll() {
    return this.lugaresTuristicosService.findAll();
  }

  @Query(() => LugaresTuristico, { name: 'lugaresTuristico' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.lugaresTuristicosService.findOne(id);
  }
}
