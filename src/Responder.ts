class Responder {
    minimumDomWidth: Number;
    maximumDomWidth: Number;
    config: Array < any >
    viewports: Array < String > ;
    enterFunction: any;
    exitFunction: any;
    matchObject: any;

    constructor(viewports: Array < String > , config: Array < any > , enterFunction: any, exitFunction: any) {
        this.config = config;
        this.viewports = viewports;
        this.enterFunction = enterFunction ?? function() {};
        this.exitFunction = exitFunction ?? function() {};
    }

    setup(): void {
        this.matchObject = this.createMatchMediaObject();
        this.defineFunctionToRun()
        this.setMaximumDomWidth()
        this.setMinimumDomWidth()
    }

    setMaximumDomWidth(): void {
        let max: Number = 0

        this.config.forEach(breakpoint => {
          const isBreakpointInViewports = this.viewports.indexOf(breakpoint.name) !== -1
            if (isBreakpointInViewports) {
                max = breakpoint.max > max ? breakpoint.max : max
            }
        })

        this.maximumDomWidth = max
    }

    setMinimumDomWidth(): void {
        let min: Number

        this.config.forEach(breakpoint => {
          const isBreakpointInViewports = this.viewports.indexOf(breakpoint.name) !== -1
            if (isBreakpointInViewports) {
                if (min === undefined) {
                    min = breakpoint.min
                }
                
                min = breakpoint.min > min ? min : breakpoint.min
            }
        })

        this.minimumDomWidth = min
    }

    validate(): boolean {
        let output = true;
        this.viewports.forEach(viewport => {
            const isViewpointNotInConfig = this.config.indexOf(viewport) === -1
            if (isViewpointNotInConfig) { output = false }
        })

        return output;
    }

    defineFunctionToRun(): void {
        if (this.matchObject.matches) {
            this.enterFunction()
        } else {
            this.exitFunction()
        }
    }

    createMatchMediaObject(): any {
        return window.matchMedia(`(min-width: ${this.minimumDomWidth}px) and (max-width: ${this.maximumDomWidth}px)`)
        //TODO test this!
    }
}

export default Responder;
