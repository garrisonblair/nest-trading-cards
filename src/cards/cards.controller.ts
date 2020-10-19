import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateCardDto } from './dto/create.card.dto'
import { CardsService } from './cards.service'
import { Card } from './interfaces/card.interface'

@Controller('cards')
export class CardsController {
    constructor(private readonly cardsService: CardsService) {}

    @Get()
    findAll(): Promise<Card[]> {
        return this.cardsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Card> {
        return this.cardsService.findOne(id)
    }

    @Post()
    create(@Body() createCardDto: CreateCardDto): Promise<Card> {
        return this.cardsService.create(createCardDto)
    }

    @Put(':id')
    update(@Body() updateCardDto: CreateCardDto, @Param('id') id): Promise<Card> {
        return this.cardsService.update(id, updateCardDto)
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Card> {
        return this.cardsService.delete(id)
    }
}
