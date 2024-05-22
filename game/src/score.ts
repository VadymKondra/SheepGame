export class Score {
    private static result: number = 0;

    public updateScore(points: number) {
        Score.result += points;
        const total = document.getElementById('score');
        if (total) {
            total.innerText = `Total: ${Score.result}`;
        }
    }
}