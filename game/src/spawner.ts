import { Application, Renderer } from "pixi.js";
import { Sheep } from "./sheep";

export class Spawner {
    private static initialSpawner: NodeJS.Timeout;


    static startSpawn (parent: Application<Renderer>, freeSheep: Sheep[]) {
        this.initialSpawner = setInterval(() => {
            if(freeSheep.length < 5) {
                const spawnPoint = {x: Math.random() * 640, y: Math.random() * 360};
                const sheep = new Sheep({...spawnPoint, label: 'sheep'}, parent);
                freeSheep.push(sheep);
            }
        }, 750);
    }

    static stopSpawn() {
        clearInterval(this.initialSpawner);
    }
}