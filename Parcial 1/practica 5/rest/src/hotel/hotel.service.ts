import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepo: Repository<Hotel>,
  ) {}

  async create(createHotelDto: CreateHotelDto) {
    const hotel = this.hotelRepo.create(createHotelDto);
    return await this.hotelRepo.save(hotel);
  }

  async findAll() {
    return await this.hotelRepo.find();
  }

  async findOne(id: string) {
    const hotel = await this.hotelRepo.findOneBy({ id });
    if (!hotel) {
      throw new NotFoundException('No se encontró el hotel.');
    }
    return hotel;
  }

  async update(id: string, updateHotelDto: UpdateHotelDto) {
    const hotel = await this.hotelRepo.findOneBy({ id });
    if (!hotel) {
      throw new NotFoundException('No se encontró el hotel.');
    }
    await this.hotelRepo.update(id, updateHotelDto);
    return await this.hotelRepo.findOneBy({ id });
  }

  async remove(id: string) {
    const hotel = await this.findOne(id);
    await this.hotelRepo.remove(hotel);
  }
}
