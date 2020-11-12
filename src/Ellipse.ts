/**
 * Responsible for drawing a elliptical shapes on the canvas, like circles. It
 * utilyzes the `CanvasRenderingContext2D.ellipse()` method of the Canvas 2D 
 * API to add an elliptical arc to the canvas.
 * 
 * @see [CanvasRenderingContext2D.ellipse()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse)
 * 
 * @author BugSlayer
 */
class Ellipse {

    /**
     * The x-axis (horizontal) coordinate of the ellipse's center.
     */
    public x: number;
 
    
    /**
     * The y-axis (vertical) coordinate of the ellipse's center.
     */
    public y: number;
   
    
    /**
     * The ellipse's major-axis radius. Must be non-negative.
     */
    public radiusX: number;
   
    
    /**
     * The ellipse's minor-axis radius. Must be non-negative.
     */
    public radiusY: number;


    /**
     * The rotation of the ellipse, expressed in radians. Default is 0.
     */
    public rotation: number = 0;
    

    /**
     * The angle at which the ellipse starts, measured clockwise from the 
     * positive x-axis and expressed in radians. Default is 0, for making a
     * full circle.
     */
    public startAngle: number = 0;


    /**
     * The angle at which the ellipse ends, measured clockwise from the 
     * positive x-axis and expressed in radians. Default is 2 * Math.PI, for 
     * making a full circle.
     */
    public endAngle: number = 2 * Math.PI;


    /**
     * An optional `Boolean` which, if `true`, draws the ellipse anticlockwise 
     * (counter-clockwise). The default value is false (clockwise).
     */
    public clockwise: boolean = false;


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
     * construct a new object of this class.
     * 
     * @param {number} x The x-axis (horizontal) coordinate of the ellipse's 
     * center.
     * @param {number} y The y-axis (vertical) coordinate of the ellipse's 
     * center.
     * @param {number} radiusX The ellipse's major-axis radius. Must be 
     * non-negative.
     * @param {number} radiusY (optional) The ellipse's minor-axis radius. Must 
     * be non-negative. If ommited, the radiusX value will be used and the shape
     * will be a circle.
     */
    public constructor(x: number, y: number, radiusX: number, radiusY?: number) {
        this.x = x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = (radiusY ? radiusY : radiusX);
    }


    /**
     * Draws the current ellipse with the current settings to the specified
     * CanvasRenderingContext2D.
     * 
     * @param {CanvasRenderingContext2D} ctx - The renderingcontext to draw on 
     */
    public drawCircle(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radiusX, this.startAngle, this.endAngle);
        if (this.fill) {
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