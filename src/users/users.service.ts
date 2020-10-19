import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel:Model<User>) {}

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findOne(username: string): Promise<User> {
        return await this.userModel.find({ username: username });
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        bcrypt.hash(user.password, 10, function(err, hash) {
            newUser.password = hash;
            newUser.save()
        });

        return await newUser
    }

    async update(id: string, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, { new: true })
    }

    async delete(id: string): Promise<User> {
        return await this.userModel.findByIdAndRemove(id)
    }
}
