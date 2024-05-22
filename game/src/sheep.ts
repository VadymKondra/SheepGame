import {Application, Renderer} from 'pixi.js'
import {charScheme } from './types';
import { Character } from './character';

const sheepSize = 15;

export class Sheep extends Character {
    constructor (point: charScheme, parent: Application<Renderer>, color = 0xffffff ) {
        super(point, parent, sheepSize, color);
    }
}