import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateCardDto } from './dto/create.card.dto'

@Controller('cards')
export class CardsController {
    @Get()
    findAll(): string {
        return 'all cards'
    }

    @Get(':id')
    findOne(@Param() param): string {
        return `one card for id: ${param.id}`
    }

    @Post()
    create(@Body() createCardDto: CreateCardDto): string {
        return `Name: ${createCardDto.name}`
    }

    @Put(':id')
    update(@Body() updateCardDto: CreateCardDto, @Param('id') id): string {
        return `update ${id} for ${updateCardDto.name}`
    }

    @Delete(':id')
    delete(@Param('id') id): string {
        return `delete card ${id}`
    }
}
