/**
 * Responsible for drawing a rectangle on the canvas. It utilyzes the 
 * `CanvasRenderingContext2D.rect()` method of the canvas 2D API to add a
 * rectangular shape to the canvas.
 * 
 * @see [CanvasRenderingContext2D.rect()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rect)
 * 
 * @author BugSlayer
 */
class Rectangle {

    /**
     * The x-axis coordinate of the rectangle's starting point.
     */
    public x: number;
    

    /**
     * The y-axis coordinate of the rectangle's starting point.
     */
    public y: number;
    

    /**
     * The rectangle's width. Positive values are to the right, and negative
     * to the left.
     */
    public width: number;
    

    /**
     * The rectangle's height. Positive values are down, and negative are up.
     */
    public height: number;


    /**
     * Sets the thickness of lines for this rectangle.
     * 
     * @see [CanvasRenderingContext2D.lineWidth](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth)
     */
    public lineWidth: number = 1;


    /**
     * The strokeStyle of this rectangle. Can be set to a color or some other 
     * style.
     * 
     * @see [CanvasRenderingContext2D.strokeStyle](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle)
     */
    public strokeStyle: string | CanvasGradient | CanvasPattern = "white";


    /**
     * If `true`, the rectangle will be filled, using the current fillStyle.
     * Otherwise it will be stroked with the current lineWidth and strokeStyle.
     */
    public fill: boolean = true;


    /**
     * The fillStyle of this text. Can be set to a color or some other style.
     * 
     * @see [CanvasRenderingContext2D.fillStyle](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle)
     */
    public fillStyle: string | CanvasGradient | CanvasPattern = "white";


    /**
     * constructs a new object of this class
     * 
     * @param {number} x The x-axis coordinate of the rectangle's starting point.
     * @param {number} y The y-axis coordinate of the rectangle's starting point.
     * @param {number} width The rectangle's width. Positive values are to the 
     * right, and negative to the left.
     * @param {number} height The rectangle's height. Positive values are down, 
     * and negative are up.
     */
    public constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    
    /**
     * Draws the current rectangle with the current settings to the specified
     * CanvasRenderingContext2D.
     * 
     * @param {CanvasRenderingContext2D} ctx - The renderingcontext to draw on 
     */
    public drawRectangle(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        if (this.fill) {
            console.log(this.fillStyle);
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        } else {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.restore();
    }

}