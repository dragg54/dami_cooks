import { BaseError } from "./BaseError.js";

export class TooManyRequestError extends BaseError{
    constructor(message){
        super(message, 429)
    }
}