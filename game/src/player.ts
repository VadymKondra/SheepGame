import {Application, Graphics, Renderer} from 'pixi.js'
import { Sheep } from './sheep';
import { Point, charScheme } from './types';
import { Character } from './character';

const spaceBetweenSheep = 35;
const spaceBetweenPlayerAndSheep = 40

export class Player extends Character {
    playerName: string;
    radius: number;
    caughtSheep: Sheep[];


    constructor (point: charScheme, app: Application<Renderer>, color = 0xc32148, radius = 20) {
        super(point, app, radius, color)
        this.playerName = point.label;
        this.radius = radius;
        this.caughtSheep = [];
    }

    move (point: Point, app: Application<Renderer>) {
        this.visual.x = point.x;
        this.visual.y = point.y;
        app.stage.addChild(this.visual);
        const sheepPoint = {...point};
        sheepPoint.x = point.x - spaceBetweenPlayerAndSheep;
        this.orderSheep(sheepPoint, app);
    }

    catchTheSheep (allFreeSheepAround: Sheep[], point:Point, app: Application<Renderer>) {
        if(this.caughtSheep.length < 5) {
            this.caughtSheep = [...this.caughtSheep, ...allFreeSheepAround.filter( (singleSheep) => Math.hypot(singleSheep.visual.x - point.x, singleSheep.visual.y - point.y) <= 45)]
            allFreeSheepAround.filter( (notFreeSheep) => {
                if (this.caughtSheep.includes(notFreeSheep)) {
                    allFreeSheepAround.splice(allFreeSheepAround.indexOf(notFreeSheep), 1);
                }
                return this.caughtSheep.includes(notFreeSheep) === false;
            } )
            const sheepPoint = {...point};
            sheepPoint.x = point.x - spaceBetweenPlayerAndSheep;
            this.orderSheep(sheepPoint, app);
        }
    }

    orderSheep (startPoint: Point, app: Application<Renderer>) {
        let sheepPoint = startPoint;
        this.caughtSheep.forEach((sheep) => {
            sheep.visual.x = startPoint.x;
            sheep.visual.y = startPoint.y
            sheepPoint.x = sheepPoint.x - spaceBetweenSheep;
            app.stage.addChild(sheep.visual);
    })
    }

    sendSheepToYard () {
        const sheepAmount = this.caughtSheep.length;
        this.caughtSheep.forEach((sheep) => {
            sheep.visual.destroy();
        })
        this.caughtSheep = []
        return sheepAmount;
    }
}