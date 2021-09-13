export class Point {
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    public x: number;
    public y: number;

    public toString(): string {
        return '(' + this.x.toFixed(1) + ', ' + this.y.toFixed(1) + ')';
    }
}

export class Line {
    constructor(a: Point, b: Point) {
        this.a = a
        this.b = b
    }
    public a: Point;
    public b: Point;

    public toString(): string {
        return this.a + '-' + this.b ;
    }
}

export class Context {
    constructor(canvas: any, width: number, marginX: number, height: number, marginY: number, maxX: number, maxY: number) {
        this.canvas = canvas
        this.width = width
        this.marginX = marginX
        this.height = height
        this.marginY = marginY
        this.maxX = maxX
        this.maxY = maxY
    }
    
    private canvas: any
    private width: number
    private marginX: number
    private height: number
    private marginY: number
    private maxX: number
    private maxY: number

    private rectInternal(x: number, y: number, width: number, height: number): void {
        this.canvas.rect(x, y, width, height)
    }

    public clearRect(): void {
        this.canvas.clearRect(0, 0, this.width, this.height)
    }

    private moveToInternal(x: number, y: number) {
        this.canvas.moveTo(x, y)
    }

    private lineToInternal(x: number, y: number) {
        this.canvas.lineTo(x, y)
    }

    public beginPath() {
        this.canvas.beginPath();
    }

    public stroke() {
        console.info("Stroke")
        this.canvas.stroke();
    }

    private fillTextInternal(text: string, x: number, y: number) {
        this.canvas.fillText(text, x, y)
    }

    public setLineWidth(width: number): void {
        this.canvas.lineWidth = width
    }

    public setStrokeStyle(style: string): void {
        this.canvas.strokeStyle = style
    }

    public setFont(font: string): void {
        this.canvas.font = font
    }

    public convertWidth(width: number): number {
        const aX = (this.width - 2 * this.marginX) / (2 * this.maxX);
        return width * aX;
    }

    public convertX(x: number): number {
        const bX = this.width / 2;
        return this.convertWidth(x) + bX
    }

    public convertHeight(height: number): number {
        const aY = (this.height - 2 * this.marginY) / (2 * this.maxY);
        return height * aY;
    }
    
    public convertY(y: number): number {
        const bY = this.height / 2;
        return -this.convertHeight(y) + bY
    }

    public rect(x: number, y: number, width: number, height: number): void {
        this.rectInternal(this.convertX(x), this.convertY(y), this.convertWidth(width), this.convertHeight(height));
    }

    public moveTo(point: Point): void {
        console.info('moveTo(' + this.convertX(point.x) + ', ' + this.convertY(point.y) + ')')
        this.moveToInternal(this.convertX(point.x), this.convertY(point.y));
    }

    public lineTo(point: Point): void {
        console.info('lineTo(' + this.convertX(point.x) + ', ' + this.convertY(point.y) + ')')
        this.lineToInternal(this.convertX(point.x), this.convertY(point.y));
    }

    private drawLine(line: Line) {
        const transformedLine = this.transformLine(line);
        console.info(`Draw line: ${transformedLine}`)
        this.moveToInternal(transformedLine.a.x, transformedLine.a.y)
        this.lineToInternal(transformedLine.b.x, transformedLine.b.y)
    }

    private transformLine(line: Line): Line {
        return new Line(this.transformPoint(line.a), this.transformPoint(line.b))
    }

    private transformPoint(point: Point): Point {
        return new Point(this.convertX(point.x), this.convertY(point.y))
    }

    public fillText(str: string, x: number, y: number): void {
        this.fillTextInternal(str, this.convertX(x), this.convertY(y));
    }

    private IntersectionOfLinesY(line: Line): void {
        console.info(`IntersectionOfLinesY: ${line}`)
        if (line.b.y < this.maxY && line.b.y > -this.maxY && line.a.y < this.maxY && line.a.y > -this.maxY) {
            this.drawLine(new Line(new Point(line.a.x, line.a.y), new Point(line.b.x, line.b.y)));
        } else if (line.b.y > this.maxY && line.a.y < this.maxY && line.a.y > -this.maxY) // 1 and 2 fourth
        {
            this.drawLine(new Line(new Point(line.a.x, line.a.y), new Point((this.maxY - line.a.y) * (line.a.x - line.b.x) / (line.a.y - line.b.y) + line.a.x, this.maxY)))
        } else if (line.b.y < this.maxY && line.a.y > this.maxY && line.b.y > -this.maxY) {
            this.drawLine(new Line(new Point(line.b.x, line.b.y), new Point((this.maxY - line.b.y) * (line.b.x - line.a.x) / (line.b.y - line.a.y) + line.b.x, this.maxY)))
        } else if (line.b.y < -this.maxY && line.a.y > -this.maxY && line.a.y < this.maxY) {
            this.drawLine(new Line(new Point(line.a.x, line.a.y), new Point((-this.maxY - line.a.y) * (line.a.x - line.b.x) / (line.a.y - line.b.y) + line.a.x, -this.maxY)))
        } else if (line.a.y < -this.maxY && line.b.y > -this.maxY && line.b.y < this.maxY) {
            this.drawLine(new Line(new Point(line.b.x, line.b.y), new Point((-this.maxY - line.b.y) * (line.b.x - line.a.x) / (line.b.y - line.a.y) + line.b.x, -this.maxY)))
        } else {
            console.info(`No draw (Y): ${line}`)
        }
    }

    private IntersectionOfLinesX(line: Line): void {
        console.info(`IntersectionOfLinesX: ${line}`)
        if (line.b.x < this.maxX && line.b.x > -this.maxX && line.a.x < this.maxX && line.a.x > -this.maxX) {
            this.IntersectionOfLinesY(new Line(new Point(line.a.x, line.a.y), new Point(line.b.x, line.b.y)));
        } else if (line.b.x > this.maxX && line.a.x < this.maxX && line.a.x > -this.maxX) {
            this.IntersectionOfLinesY(new Line(new Point(line.a.x, line.a.y), new Point(this.maxX, (this.maxX - line.b.x) * (line.a.y - line.b.y) / (line.a.x - line.b.x) + line.b.y)));
        } else if (line.a.x > this.maxX && line.b.x < this.maxX && line.b.x > -this.maxX) {
            this.IntersectionOfLinesY(new Line(new Point(line.b.x, line.b.y), new Point(this.maxX, (this.maxX - line.a.x) * (line.b.y - line.a.y) / (line.b.x - line.a.x) + line.a.y)));
        } else {
            console.info(`No draw (X): ${line}`)
        }
    }

    public drawCurve(max: number, step: number, fn: (x: number) => number, color: string): void {
        console.info(`max: ${max}, step: ${step}`)
        this.beginPath();
        this.setLineWidth(3);
        this.setStrokeStyle(color);
        for (let x = -max; x < max; x = x + step) {
            this.IntersectionOfLinesX(new Line(new Point(x, fn(x)), new Point(x + step, fn(x + step))))
        }
        this.stroke();
    }
}

