import Responder from './Responder'
class ResponderFactory {
    breakpoints: Array < breakpoint >

    constructor(breakpoints: Array < breakpoint >) {
        this.breakpoints = breakpoints;
    }
    createResponder(viewports: Array < String > , enterFunction: any, exitFunction: any): Responder {
        return new Responder(viewports, this.breakpoints, enterFunction, exitFunction)
    }

    createResponders(responderConfigs: Array < ResponderConfig >): Array < Responder > {
        let ResponderInstances: Array < Responder > = []

        responderConfigs.forEach(responderConfig => {
            ResponderInstances.push(new Responder(responderConfig.viewports, this.breakpoints, responderConfig.enterFunction, responderConfig.exitFunction)) 
        });
        
        return ResponderInstances
    }
}

export default ResponderFactory