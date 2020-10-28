import { Injectable } from '@nestjs/common';
import { User, UserWithCardsRO } from './interfaces/user.interface';
import { Card } from '../cards/interfaces/card.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
// import * as mongoose from 'mongoose'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel:Model<User>, 
        @InjectModel('Card') private readonly cardModel:Model<Card>
        ) {}

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findOne(username: string): Promise<User> {
        return await this.userModel.findOne({ username: username });
    }

    async findUserWithCards(username: string): Promise<UserWithCardsRO> {
        const user = await this.userModel.findOne({ username: username }).populate('cards');
        const newUser = {
            _id: user._id,
            username: user.username,
            cards: user.cards
        }
        
        return newUser
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        bcrypt.hash(user.password, 10, function(err, hash) {
            newUser.password = hash;
            newUser.save();
        });

        return await newUser;
    }

    async update(id: string, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, { new: true });
    }

    async addCardToUser(username: string, cardId: string): Promise<User> {
        const user = await this.userModel.findOne({ username: username }).populate('cards');
        const card = await this.cardModel.findOne({ _id: cardId });
        user.cards.push(card);

        return await user.save();
    }

    // async tradeCards(userOne:string, cardOneId: string, userTwo: string, cardTwoId: string): Promise<Card[]> {
    //     console.log("ID1", cardOneId);
    //     console.log("ID2", cardTwoId);
    //     const cardOne = await this.cardModel.findOne({ username: cardOneId });
    //     const cardTwo = await this.cardModel.findOne({ username: cardTwoId });
        
    //     this.userModel.update(
    //         { _id: mongoose.Types.ObjectId(userOne) },
    //         { 
    //             $pull: { 'cards': { _id: mongoose.Types.ObjectId(cardOneId) } },
    //             $push: { cards: mongoose.Types.ObjectId(cardTwoId) }
    //         }
    //     );

    //     this.userModel.update(
    //         { _id: mongoose.Types.ObjectId(userTwo) },
    //         { 
    //             $pull: { 'cards': { _id: mongoose.Types.ObjectId(cardTwoId) } },
    //             $push: { cards: mongoose.Types.ObjectId(cardOneId) }
    //         }
    //     );

    //     return [cardTwo, cardOne]
    // }

    async delete(id: string): Promise<User> {
        return await this.userModel.findByIdAndRemove(id);
    }
}
