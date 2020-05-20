import Responder from './Responder'

class ResponderFactory {
    breakpoints: Array < any >

    constructor(breakpoints: Array < any >) {
        this.breakpoints = breakpoints;
    }
    createResponder(viewports: Array < String > , enterFunction: any, exitFunction: any) {
        return new Responder(viewports, this.config, enterFunction, exitFunction)
    }
}

export default ResponderFactory