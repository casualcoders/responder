class Responder {
    minimumDomWidth: Number;
    maximumDomWidth: Number;
    config: Array < breakpoint >
    viewports: Array < String >;
    enterFunction: any;
    exitFunction: any;
    matchObject: any;

    constructor( config: Array < breakpoint >, viewports: Array < String > , enterFunction: any, exitFunction: any) {
        this.config = config;
        this.viewports = viewports;
        this.enterFunction = enterFunction ?? function() {};
        this.exitFunction = exitFunction ?? function() {};
        this.minimumDomWidth = 0;
        this.maximumDomWidth = Number.MAX_SAFE_INTEGER;
        if (!this.isValid()) {
            throw new Error("the viewports array contains strings not found in the breakpoint config");
        }
    }

    setup(): void {
        this.setMaximumDomWidth()
        this.setMinimumDomWidth()
        this.matchObject = this.createMatchMediaObject();
        this.defineFunctionToRun()
    }

    setMaximumDomWidth(): void {
        let max: Number = 0

        this.config.forEach(breakpoint => {
          const isBreakpointInViewports = this.viewports.indexOf(breakpoint.label) !== -1
            if (isBreakpointInViewports) {
                max = breakpoint.max > max ? breakpoint.max : max
            }
        })

        this.maximumDomWidth = max
    }

    setMinimumDomWidth(): void {
        let min: Number = 0

        this.config.forEach(breakpoint => {
          const isBreakpointInViewports = this.viewports.indexOf(breakpoint.label) !== -1
            if (isBreakpointInViewports) {
                if (min === 0) {
                    min = breakpoint.min
                }
                
                min = breakpoint.min > min ? min : breakpoint.min
            }
        })

        this.minimumDomWidth = min
    }

    isValid(): boolean {
        let output = false;
        this.viewports.forEach(viewport => {
            this.config.forEach(breakpoint => {
                if (breakpoint.label === viewport) {
                    output = true
                }
            });
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
