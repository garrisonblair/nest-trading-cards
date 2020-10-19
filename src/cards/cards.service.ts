import { Injectable } from '@nestjs/common';
import { Card } from './interfaces/card.interface'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateCardDto } from './dto/create.card.dto';

@Injectable()
export class CardsService {
    constructor(@InjectModel('Card') private readonly cardModel:Model<Card>) {}

    async findAll(): Promise<Card[]> {
        return await this.cardModel.find();
    }

    async findOne(id: string): Promise<Card> {
        return await this.cardModel.findOne({ _id: id });
    }

    async create(card: Card): Promise<Card> {
        const newCard = new this.cardModel(card);
        return await newCard.save()
    }

    async update(id: string, card: Card): Promise<Card> {
        return await this.cardModel.findByIdAndUpdate(id, card, { new: true })
    }

    async delete(id: string): Promise<Card> {
        return await this.cardModel.findOneByIdAndRemove(id)
    }

}
