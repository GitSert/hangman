class Game {

    /**
     * @internal Holds the canvas HTML element where this game should draw on. 
     * This variable knows the screen's size.
     * 
     * @see [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
     */
    private readonly canvas: HTMLCanvasElement;
    
    
    /**
     * @internal attribute that holds the RenderContext to draw on. This will
     * be used in the `draw()` method.
     * 
     * @see [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
     */
    private readonly ctx: CanvasRenderingContext2D;

    // The game screen components
    private title: TextString;
    private word: TextString;


    // List of words that can get picked randomly
    private listOfWords: string[];

    // Random word
    private randomWord: string;

    // The gallow parts
    private base: Rectangle;
    private verticalStrut: Rectangle;
    private horizontalStrut: Rectangle;
    private diagonalStrut: Line;
    private rope: Line;

    // The hangman parts
    private body: Rectangle;
    private head: Ellipse;
    private neck: Line;
    private arm1: Line;
    private arm2: Line;
    private leg1: Line;
    private leg2: Line;

    // Attempts left
    private attempts: number;

    // Count to see if the key pressed is the same as any of the letters in the word
    private sameCount: number;

    // Adds an array that holds all correctly guessed letters
    private correctLetters: string[];
    
    // Adds an array that holds dashes based on the length of the word
    private dashes: string[];

    // Holds the final input for word
    private wordInput: string;
    

    /**
     * Construct a new Game.
     * 
     * @param {HTMLCanvasElement} canvasId 
     */
    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        // Resize the canvas to fit the entire window
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set the context of the canvas
        this.ctx = this.canvas.getContext('2d');

        // Initialize the game items
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;

        // Start with 7 tries
        this.attempts = 7;
        console.log(`start with 7 attempts`) 

        // Initialize the word
        this.listOfWords = [
            "fridge",
            "dog", 
            "phone",
            "table",
        ];
        this.correctLetters = [];
        this.randomWord = this.pickRandomWord(this.listOfWords);
        this.dashes = [];
        this.fillDashes(this.randomWord)
        this.wordInput = this.dashes.join(' ')

        this.title = new TextString(cx, 70, "Hangman, the game");
        this.word = new TextString(cx, 220, this.wordInput);

        // The base of the hangman
        this.base = new Rectangle(cx - 250, cy + 350, 600, 30);
        this.verticalStrut = new Rectangle(cx - 250, cy - 230, 30, 600);
        this.horizontalStrut = new Rectangle(cx - 250, cy - 230, 400, 30);
        this.diagonalStrut = new Line(cx - 230, cy - 100, cx - 170, cy - 210);
        this.rope = new Line(cx + 42, cy + 6, cx + 42, cy - 210);
        // Creating all hangman parts
        this.body = new Rectangle(cx + 38, cy + 10, 8, 160);
        this.neck = new Line(cx + 42, cy + 15, cx + 42, cy - 30)
        this.head = new Ellipse(cx + 30, cy - 60, 60, 60);
        this.arm1 = new Line(cx + 42, cy + 5, cx - 50, cy + 100);
        this.arm2 = new Line(cx + 42, cy + 5, cx + 130, cy + 100);
        this.leg1 = new Line(cx + 42, cy + 160, cx - 20, cy + 300);
        this.leg2 = new Line(cx + 42, cy + 160, cx + 100, cy + 300);

        // Gallow properties
        this.base.fillStyle = "rgb(150, 70, 45)";
        this.verticalStrut.fillStyle = "rgb(150, 70, 45)";
        this.horizontalStrut.fillStyle = "rgb(150, 70, 45)";
        this.diagonalStrut.strokeStyle = "rgb(150, 70, 45)";
        this.diagonalStrut.lineWidth = 15;
        this.rope.strokeStyle = "rgb(100, 30, 10)";
        this.rope.lineWidth = 10;
        // Hangman part properties
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


        // Draw the canvas
        this.drawCanvas();

        // Attach an eventlistener to the keyUp event
        window.addEventListener("keypress", this.keyPress);
    }

    // Function to pick a random word
    public pickRandomWord(array: string[]): string {
        let randomNum = Math.floor((Math.random() * array.length));
        let pickedWord = array[randomNum];
        console.log(`randomly picked word: ${pickedWord}`);
        return pickedWord;
    }

    /**
     *  Function that adds dashes to the dash array
     */
    public fillDashes(word: string) {
        //for each letter in the word
        for (let i = 0; i < word.length; i++) {  
            //put a dash on the i'th place of the array dashes  
            this.dashes[i] = ("-")
 //           //
            if (this.correctLetters.includes(word[i])) {
                console.log("adasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdsd")
            }
        }
        console.log(`Dashes: ${this.dashes}`)
        return this.dashes
    }

    /**
     * Function that checks if the pressed key is in the randomized word and displays the letter to the DOM if it is similar 
    */
    public checkIfKeyIsInWord(key: string) {
        this.sameCount = 0;
        //for each letter in randomWord
        for (let i = 0; i < this.randomWord.length; i++) {
            //if the pressed key is in randomWord
            if (this.randomWord[i] === key) {
                console.log(`${key} is in ${this.randomWord}`)
                //push the letter to the correctLetters array
                this.correctLetters.push(key);
                //for each letter in correctletters
                for (let i = 0; i < this.correctLetters.length; i++) {
                    //for each letter in randomWord
                    for (let j = 0; j < this.randomWord.length; j++) {
                        if (this.correctLetters[i] === this.randomWord[j]) {
//                            //this.wordInput = ;
                        }
                    }
                }
            } 
            //if the pressed key is not in randomWord
            else {
                this.sameCount += 1;
            }
            //if the pressed key is not the same as any of the letters in randomWord
            if (this.sameCount === this.randomWord.length) {
                this.attempts -= 1;
                console.log(`guessed the wrong letter, ${this.attempts} attempts left`)
            }
        }
        console.log(`Guessed letters: ${this.correctLetters}`)
        //if the length of correctLetters is the same as the length of randomWord all of the letters in randomWord are guessed
        if (this.correctLetters.length === this.randomWord.length) {
            console.log(`You have guessed the entire word`)
        }
        this.drawCanvas()        
    }

    /**
     * (Re)draws the canvas.
     */
    private drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.title.drawText(this.ctx);
        this.word.drawText(this.ctx);
        // Draw the gallow
        this.base.drawRectangle(this.ctx);
        this.verticalStrut.drawRectangle(this.ctx);
        this.horizontalStrut.drawRectangle(this.ctx);
        this.diagonalStrut.drawLine(this.ctx);
        // Draw the hangman
        if (this.attempts >= 3) {this.body.drawRectangle(this.ctx);}
        if (this.attempts >= 2) {this.neck.drawLine(this.ctx);}
        if (this.attempts >= 4) {this.arm1.drawLine(this.ctx);}
        if (this.attempts >= 5) {this.arm2.drawLine(this.ctx);}
        this.rope.drawLine(this.ctx);
        if (this.attempts >= 1) {this.head.drawCircle(this.ctx);}
        if (this.attempts >= 6) {this.leg1.drawLine(this.ctx);}
        if (this.attempts >= 7) {this.leg2.drawLine(this.ctx);}
    }

    /**
     * @internal Arrow method that catches keyup events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private keyPress = (ev: KeyboardEvent) => {
        // TODO handle key pressed events
        console.log(`Key ${ev.key} has been pressed`);
        this.checkIfKeyIsInWord(ev.key);
    }


}

// DO NOT CHANGE THE CODE BELOW!

// Declare the game object as global variable for debugging purposes
let game = null;

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', function () {
    game = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
});
