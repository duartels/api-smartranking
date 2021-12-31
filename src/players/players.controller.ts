import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { PlayersService } from './players.service';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';

@Controller('players')
export class PlayersController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly playersService: PlayersService) { }

  @Get()
  async list(@Query('email') email: string): Promise<Player[] | Player> {
    if (email) return await this.playersService.findByEmail(email);

    return await this.playersService.list();
  }

  @Post()
  async createOrUpdatePlayer(
    @Body() createPlayerDTO: CreatePlayerDTO,
  ): Promise<void> {
    await this.playersService.createOrUpdatePlayer(createPlayerDTO);
  }

  @Delete(':email')
  async delete(@Param('email') email: string): Promise<void> {
    await this.playersService.delete(email);
  }
}
