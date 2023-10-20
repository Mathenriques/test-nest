import { Body, Controller, Get } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { CreateMemberBody } from './dtos/create-team-member-body';
import { randomUUID } from 'node:crypto';

@Controller('app')
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get('createMember')
  async createMember(@Body() body: CreateMemberBody) {
    const { name, function: memberFunction } = body;

    const member = await this.prisma.members.create({
      data: {
        id: randomUUID(),
        name,
        function: memberFunction,
      },
    });

    return {
      member,
    };
  }
}
