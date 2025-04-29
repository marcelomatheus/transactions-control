import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bycript from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const isExist = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (isExist) {
      throw new ConflictException('User already exists');
    }
    const data = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: await bycript.hash(createUserDto.password, 10),
      },
    });
    delete data.password;
    return data;
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const isExist = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!isExist) {
      return new NotFoundException('User not found');
    }

    const data = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
    return data;
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    return;
  }
}
