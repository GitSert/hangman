/**
 * Responsible for drawing a single line to the canvas. It utilyzes the 
 * `CanvasRenderingContext2D.lineTo()` method of the canvas 2D API. This class
 * is meant to simplify the complexity of using the concept of paths that the
 * API uses to make it easy to draw just a single line.
 * 
 * @see [CanvasRenderingContext2D.lineTo()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo)
 * 
 * @author BugSlayer
 */
class Line {

    /**
     * The x-axis (horizontal) coordinate of the line start.
     */
    public x1: number;


    /**
     * The y-axis (vertical) coordinate of the line start.
     */
    public y1: number;


    /**
     * The x-axis (horizontal) coordinate of the line end.
     */
    public x2: number;


    /**
     * The y-axis (vertical) coordinate of the line end.
     */
    public y2: number;


    /**
     * Sets the thickness of lines for this line.
     * 
     * @see [CanvasRenderingContext2D.lineWidth](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth)
     */
    public lineWidth: number = 1;


    /**
     * The strokeStyle of this line. Can be set to a color or some other 
     * style.
     * 
     * @see [CanvasRenderingContext2D.strokeStyle](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle)
     */
    public strokeStyle: string | CanvasGradient | CanvasPattern = "white";


    /**
     * 
     * @param {number} x1 The x-axis (horizontal) coordinate of the line start.
     * @param {number} y1 The y-axis (vertical) coordinate of the line start.
     * @param {number} x2 The x-axis (horizontal) coordinate of the line end.
     * @param {number} y2 The y-axis (vertical) coordinate of the line end.
     */
    public constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    
    /**
     * Draws the current line with the current settings to the specified
     * CanvasRenderingContext2D.
     * 
     * @param {CanvasRenderingContext2D} ctx - The renderingcontext to draw on 
     */
    public drawLine(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.beginPath();              // Start a new path
        ctx.moveTo(this.x1, this.y1); // Move the pen to (x1, y1)
        ctx.lineTo(this.x2, this.y2); // Draw a line to (x1, y2)
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();                 // Render the path
        ctx.restore();
    }
}