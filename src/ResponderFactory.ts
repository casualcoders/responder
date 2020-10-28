import Responder from './Responder'
class ResponderFactory {
    breakpoints: Array < breakpoint >

    constructor(breakpoints: Array < breakpoint >) {
        this.breakpoints = breakpoints;
    }
    createResponder(viewports: Array < String > , enterFunction: any, exitFunction: any): Responder {
        return new Responder(this.breakpoints, viewports, enterFunction, exitFunction)
    }

    createResponders(responderConfigs: Array < ResponderConfig >): Array < Responder > {
        let ResponderInstances: Array < Responder > = []

        responderConfigs.forEach(responderConfig => {
            ResponderInstances.push(new Responder(this.breakpoints, responderConfig.viewports, responderConfig.enterFn, responderConfig.exitFn)) 
        });
        
        return ResponderInstances
    }
}

export default ResponderFactory
