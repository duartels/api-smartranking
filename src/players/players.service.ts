import { Injectable, NotFoundException } from '@nestjs/common';

import { Player } from './interfaces/player.interface';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { v4 } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  async list(): Promise<Player[]> {
    return await this.players;
  }

  async findByEmail(email: string): Promise<Player> {
    const foundPlayer = await this.players.find(
      (player) => player.email === email,
    );

    if (!foundPlayer)
      throw new NotFoundException(`Player with this email: ${email} not found`);

    return foundPlayer;
  }

  async createOrUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    const { email } = createPlayerDTO;

    const foundPlayer = await this.players.find(
      (player) => player.email === email,
    );

    if (foundPlayer) {
      await this.update(foundPlayer, createPlayerDTO);
    } else {
      await this.create(createPlayerDTO);
    }
  }

  private create(createPlayerDTO: CreatePlayerDTO): void {
    const { name, phoneNumber, email } = createPlayerDTO;

    const player: Player = {
      _id: v4(),
      name,
      phoneNumber,
      email,
      ranking: undefined,
      rankingPosition: undefined,
      avatarURL: undefined,
    };

    this.players.push(player);
  }

  private update(foundPlayer: Player, createPlayerDTO: CreatePlayerDTO): void {
    const { name } = createPlayerDTO;

    foundPlayer.name = name;
  }

  async delete(email: string): Promise<void> {
    const playerToDelete = await this.players.find(
      (player) => player.email === email,
    );

    this.players = this.players.filter(
      (player) => playerToDelete.email !== player.email,
    );
  }
}
