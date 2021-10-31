export class FunctionDefinition {
    constructor(id: number, fn: string, color: string, symbol: string) {
        this.id = id
        this.fn = fn
        this.color = color
        this.symbol = symbol
    }
    public id: number
    public fn: string
    public color: string
    public symbol: string
}

export enum Compose {
    NONE,
    DIRECT,
    REVERSE
}

export class PredefinedFunction {
    constructor(id: number, display: string, text: string, compose: Compose) {
        this.id = id
        this.display = display
        this.text = text
        this.compose = compose
    }
    public id: number;
    public display: string;
    public text: string;
    public compose: Compose;
}

export class PredefinedFunctionTrigonometry {
    constructor(id: number, display: string, text: string) {
        this.id = id
        this.display = display
        this.text = text
    }
    public id: number;
    public display: string;
    public text: string;
}
