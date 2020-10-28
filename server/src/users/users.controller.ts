import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
// import { TradeCardDto } from './dto/trade.card.dto';
// import { Card } from '../cards/interfaces/card.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @Get(':username')
    findOne(@Param('username') username): Promise<User> {
        return this.usersService.findOne(username)
    }

    @Get(':username/cards')
    getUserWithCards(@Param('username') username): Promise<User> {
        return this.usersService.findUserWithCards(username)
    }

    @Post('/register')
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto)
    }

    @Put(':id')
    update(@Body() updateUserDto: CreateUserDto, @Param('id') id): Promise<User> {
        return this.usersService.update(id, updateUserDto)
    }

    @Put(':username/:cardId')
    addCardToUser(@Param() param): Promise<User> {
        return this.usersService.addCardToUser(param.username, param.cardId)
    }

    // @Put('trade')
    // tradeCards(@Body() tradeCardDto: TradeCardDto): Promise<Card[]> {
    //     console.log('CONTROLLER TRADE DTO', tradeCardDto)
    //     return this.usersService.tradeCards(tradeCardDto.userOne, tradeCardDto.cardOne, tradeCardDto.userTwo, tradeCardDto.cardTwo)
    // }

    @Delete(':id')
    delete(@Param('id') id): Promise<User> {
        return this.usersService.delete(id)
    }
}
