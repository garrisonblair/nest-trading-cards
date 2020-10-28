import { Card } from "src/cards/interfaces/card.interface";

export interface User {
    id?: string;
    username: string;
    password: string;
}

export interface UserWithCardsRO {
    username: string,
    cards: Card[]
}