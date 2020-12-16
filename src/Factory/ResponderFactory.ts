import Responder from '../Responder/Responder'
class ResponderFactory {
    breakpoints: Array < breakpoint >

    constructor(breakpoints: Array < breakpoint >) {
        this.breakpoints = breakpoints;
    }
    createResponder(viewports: Array < String > , enterFunction:  null | Function, exitFunction:  null | Function, shouldRunExitOnSetupIfMatchFails:  null | boolean): Responder {
        return new Responder(this.breakpoints, viewports, enterFunction, exitFunction, shouldRunExitOnSetupIfMatchFails)
    }

    createResponders(responderConfigs: Array < ResponderConfig >): Array < Responder > {
        let ResponderInstances: Array < Responder > = []

        responderConfigs.forEach(responderConfig => {
            ResponderInstances.push(new Responder(this.breakpoints, responderConfig.viewports, responderConfig?.enterFn, responderConfig?.exitFn, responderConfig?.shouldRunExitOnSetupIfMatchFails)) 
        });
        
        return ResponderInstances
    }
}

export default ResponderFactory
