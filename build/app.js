class Ellipse {
    constructor(x, y, radiusX, radiusY) {
        this.rotation = 0;
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.clockwise = false;
        this.lineWidth = 1;
        this.strokeStyle = "white";
        this.fill = true;
        this.fillStyle = "white";
        this.x = x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = (radiusY ? radiusY : radiusX);
    }
    drawCircle(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radiusX, this.startAngle, this.endAngle);
        if (this.fill) {
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        else {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.restore();
    }
}
class Game {
    constructor(canvasId) {
        this.keyPress = (ev) => {
            console.log(`Key ${ev.key} has been pressed`);
            this.checkIfKeyIsInWord(ev.key);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        this.attempts = 7;
        console.log(`start with 7 attempts`);
        this.listOfWords = [
            "fridge",
            "dog",
            "phone",
            "table",
        ];
        this.correctLetters = [];
        this.randomWord = this.pickRandomWord(this.listOfWords);
        this.dashes = [];
        this.fillDashes(this.randomWord);
        this.wordInput = this.dashes.join(' ');
        this.title = new TextString(cx, 70, "Hangman, the game");
        this.word = new TextString(cx, 220, this.wordInput);
        this.base = new Rectangle(cx - 250, cy + 350, 600, 30);
        this.verticalStrut = new Rectangle(cx - 250, cy - 230, 30, 600);
        this.horizontalStrut = new Rectangle(cx - 250, cy - 230, 400, 30);
        this.diagonalStrut = new Line(cx - 230, cy - 100, cx - 170, cy - 210);
        this.rope = new Line(cx + 42, cy + 6, cx + 42, cy - 210);
        this.body = new Rectangle(cx + 38, cy + 10, 8, 160);
        this.neck = new Line(cx + 42, cy + 15, cx + 42, cy - 30);
        this.head = new Ellipse(cx + 30, cy - 60, 60, 60);
        this.arm1 = new Line(cx + 42, cy + 5, cx - 50, cy + 100);
        this.arm2 = new Line(cx + 42, cy + 5, cx + 130, cy + 100);
        this.leg1 = new Line(cx + 42, cy + 160, cx - 20, cy + 300);
        this.leg2 = new Line(cx + 42, cy + 160, cx + 100, cy + 300);
        this.base.fillStyle = "rgb(150, 70, 45)";
        this.verticalStrut.fillStyle = "rgb(150, 70, 45)";
        this.horizontalStrut.fillStyle = "rgb(150, 70, 45)";
        this.diagonalStrut.strokeStyle = "rgb(150, 70, 45)";
        this.diagonalStrut.lineWidth = 15;
        this.rope.strokeStyle = "rgb(100, 30, 10)";
        this.rope.lineWidth = 10;
        this.body.fillStyle = "white";
        this.neck.lineWidth = 8;
        this.neck.strokeStyle = "white";
        this.head.fillStyle = "white";
        this.arm1.lineWidth = 8;
        this.arm1.strokeStyle = "white";
        this.arm2.lineWidth = 8;
        this.arm2.strokeStyle = "white";
        this.leg1.lineWidth = 8;
        this.leg1.strokeStyle = "white";
        this.leg2.lineWidth = 8;
        this.leg2.strokeStyle = "white";
        this.drawCanvas();
        window.addEventListener("keypress", this.keyPress);
    }
    pickRandomWord(array) {
        let randomNum = Math.floor((Math.random() * array.length));
        let pickedWord = array[randomNum];
        console.log(`randomly picked word: ${pickedWord}`);
        return pickedWord;
    }
    fillDashes(word) {
        for (let i = 0; i < word.length; i++) {
            this.dashes[i] = ("-");
            if (this.correctLetters.indexOf(word[i]) !== -1) {
                console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
            }
        }
        console.log(`Dashes: ${this.dashes}`);
        return this.dashes;
    }
    checkIfKeyIsInWord(key) {
        this.sameCount = 0;
        for (let i = 0; i < this.randomWord.length; i++) {
            if (this.randomWord[i] === key) {
                console.log(`${key} is in ${this.randomWord}`);
                this.correctLetters.push(key);
                for (let i = 0; i < this.correctLetters.length; i++) {
                    for (let j = 0; j < this.randomWord.length; j++) {
                        if (this.correctLetters[i] === this.randomWord[j]) {
                        }
                    }
                }
            }
            else {
                this.sameCount += 1;
            }
            if (this.sameCount === this.randomWord.length) {
                this.attempts -= 1;
                console.log(`guessed the wrong letter, ${this.attempts} attempts left`);
            }
        }
        console.log(`Guessed letters: ${this.correctLetters}`);
        if (this.correctLetters.length === this.randomWord.length) {
            console.log(`You have guessed the entire word`);
        }
        this.drawCanvas();
    }
    drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.title.drawText(this.ctx);
        this.word.drawText(this.ctx);
        this.base.drawRectangle(this.ctx);
        this.verticalStrut.drawRectangle(this.ctx);
        this.horizontalStrut.drawRectangle(this.ctx);
        this.diagonalStrut.drawLine(this.ctx);
        if (this.attempts >= 3) {
            this.body.drawRectangle(this.ctx);
        }
        if (this.attempts >= 2) {
            this.neck.drawLine(this.ctx);
        }
        if (this.attempts >= 4) {
            this.arm1.drawLine(this.ctx);
        }
        if (this.attempts >= 5) {
            this.arm2.drawLine(this.ctx);
        }
        this.rope.drawLine(this.ctx);
        if (this.attempts >= 1) {
            this.head.drawCircle(this.ctx);
        }
        if (this.attempts >= 6) {
            this.leg1.drawLine(this.ctx);
        }
        if (this.attempts >= 7) {
            this.leg2.drawLine(this.ctx);
        }
    }
}
let game = null;
window.addEventListener('load', function () {
    game = new Game(document.getElementById('canvas'));
});
class Line {
    constructor(x1, y1, x2, y2) {
        this.lineWidth = 1;
        this.strokeStyle = "white";
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    drawLine(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
        ctx.restore();
    }
}
class Rectangle {
    constructor(x, y, width, height) {
        this.lineWidth = 1;
        this.strokeStyle = "white";
        this.fill = true;
        this.fillStyle = "white";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    drawRectangle(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        if (this.fill) {
            console.log(this.fillStyle);
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        else {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.restore();
    }
}
class TextString {
    constructor(x, y, text) {
        this.font = "Edmunds";
        this.fontSize = 60;
        this.fillStyle = "white";
        this.textAlign = "center";
        this.textBaseline = "alphabetic";
        this.x = x;
        this.y = y;
        this.text = text;
    }
    drawText(ctx) {
        ctx.save();
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = this.fillStyle;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}
//# sourceMappingURL=app.js.map