import {Application, Graphics} from 'pixi.js'
import {Sheep} from './sheep';
import { Player } from './player';
import { Score } from './score';
import { Spawner } from './spawner';


const app = new Application();
const sheepPoint = [
    {
        x: 110, 
        y: 250,
        label: 'sheep1'
    },
    {
        x: 230,
        y: 100,
        label: 'sheep2'
    },
    {
        x: 270,
        y: 200,
        label: 'sheep3'
    },
    {
        x: 550,
        y: 140,
        label: 'sheep4'
    },
    {
        x: 410,
        y: 70,
        label: 'sheep5'
    }
]

const freeSheep: Sheep[] = [];

const startGame = async () => {
    await app.init({ width: 640, height: 360 })
    const field = document.getElementById('gameField')
    if (!field) {
        return;
    }
    field.appendChild(app.canvas);
    const score = new Score();
    const player = new Player({x: 50, y: 50, label: 'player'}, app);
    const grassField = new Graphics().rect(0, 0, 440, 360).fill(0x1effa5)
    const yard = new Graphics().rect(440, 0, 200, 360).fill(0xf1c232)
    grassField.interactive = true;
    yard.interactive = true;

    grassField.on('mouseup', (event) => {
        const currentPoint = {x: event.globalX, y: event.globalY};
        player.move(currentPoint, app);
        player.catchTheSheep(freeSheep, currentPoint, app);
    });

    yard.on('mouseup', (event) => {
        const currentPoint = {x: event.globalX, y: event.globalY};
        player.move(currentPoint, app);
        player.catchTheSheep(freeSheep, currentPoint, app);
        const gatheredPoints = player.sendSheepToYard();
        score.updateScore(gatheredPoints);
    });

    app.stage.addChild(grassField);
    app.stage.addChild(yard);
    app.stage.addChild(player.visual);
    sheepPoint.forEach((point) => {
        const sheep = new Sheep(point, app);
        freeSheep.push(sheep);
        app.stage.addChild(sheep.visual);
    })
    Spawner.startSpawn(app, freeSheep);
}

startGame();
