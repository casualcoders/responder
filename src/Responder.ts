class Responder {
    minimumDomWidth: Number;
    maximumDomWidth: Number;
    config: Array < any >
    viewports: Array < String > ;
    enterFunction: any;
    exitFunction: any;
    macthMD ? : Boolean;

    constructor(viewports: Array < String > , config: Array < any > , enterFunction: any, exitFunction: any, macthMD ? : Boolean) {
        this.config = config;
        this.viewports = viewports;
        this.enterFunction = enterFunction;
        this.exitFunction = exitFunction;
        this.macthMD = macthMD;
    }

    setup(): void {
        this.setMaximumDomWidth()
        this.setMinimumDomWidth()
        if (document.body.clientWidth > this.minimumDomWidth && document.body.clientWidth < this.maximumDomWidth) {
          this.enterFunction()
        }
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

    defineFunctionToRun(): string {
        let output = ''
        if (this.macthMD) {
            output = this.enterFunction()
        } else {
            output = this.exitFunction()
        }
        return output
    }
}

export default Responder;
