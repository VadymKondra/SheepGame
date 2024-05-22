import { Application, Graphics, Renderer, Sprite } from "pixi.js";
import { charScheme } from "./types";

export class Character {
    visual: Sprite ;

    constructor (point: charScheme, app: Application<Renderer>, radius = 15, color = 0xffffff ) {
        const circleImg = new Graphics().circle(point.x, point.y, radius).fill(color);
        const circleTexture = app.renderer.generateTexture(circleImg);
        this.visual = new Sprite(circleTexture);
        this.visual.anchor.set(0.5);
        this.visual.position.set(point.x, point.y);
        this.visual.label = point.label;
        app.stage.addChild(this.visual);
    }
}