class Responder {
    minimumDomWidth: Number;
    maximumDomWidth: Number;
    config: Array < breakpoint >
    viewports: Array < String >;
    enterFunction: any;
    exitFunction: any;
    shouldRunExitOnSetupIfMatchFails: boolean;

    constructor( config: Array < breakpoint >, viewports: Array < String > , enterFunction:  null | Function, exitFunction: null | Function, shouldRunExitOnSetupIfMatchFails: null | boolean = true) {
        this.config = config;
        this.viewports = viewports;
        this.enterFunction = enterFunction ?? function() {};
        this.exitFunction = exitFunction ?? function() {};
        this.minimumDomWidth = 0;
        this.maximumDomWidth = Number.MAX_SAFE_INTEGER;
        this.shouldRunExitOnSetupIfMatchFails = shouldRunExitOnSetupIfMatchFails ?? false;
        if (!this.isValid()) {
            throw new Error("the viewports array contains strings not found in the breakpoint config");
        }
    }

    setup(): void {
        this.setMaximumDomWidth()
        this.setMinimumDomWidth()
        const mediaQueryList = this.createMatchMediaObject();
        if (mediaQueryList.matches || this.shouldRunExitOnSetupIfMatchFails) {
            this.defineFunctionToRun(mediaQueryList.matches)
        }
        mediaQueryList.addEventListener('change', this.defineFunctionToRunEvent)
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

    defineFunctionToRunEvent = (event: MediaQueryListEvent) => {
        this.defineFunctionToRun(event.matches)
    }

    defineFunctionToRun(matches: boolean): void {
        if (matches) {
            this.enterFunction()
        } else {
            this.exitFunction()
        }
    }

    createMatchMediaObject(): any {
        return window.matchMedia(`(min-width: ${this.minimumDomWidth}px) and (max-width: ${this.maximumDomWidth}px)`)
    }
}

export default Responder;
