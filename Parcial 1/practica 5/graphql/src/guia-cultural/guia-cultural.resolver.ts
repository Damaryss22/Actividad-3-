import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { GuiaCulturalService } from './guia-cultural.service';
import { GuiaCultural } from './entities/guia-cultural.entity';

@Resolver(() => GuiaCultural)
export class GuiaCulturalResolver {
  constructor(private readonly guiaCulturalService: GuiaCulturalService) {}

  @Query(() => [GuiaCultural], { name: 'guiaCulturales' })
  findAll() {
    return this.guiaCulturalService.findAll();
  }

  @Query(() => GuiaCultural, { name: 'guiaCultural' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.guiaCulturalService.findOne(id);
  }
}
