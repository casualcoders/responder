import should from "should";
import Responder from "./Responder";

const CONF = [
    { label: 'small', min: 0, max: 575 },
    { label: 'mobile', min: 576, max: 767 },
    { label: 'tablet', min: 768, max: 991 },
    { label: 'desktop', min: 992, max: 1199 },
    { label: 'big', min: 1200, max: 9999 }
]

function matchMediaFactory(matches: Boolean) {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query: String) => ({
            matches: matches,
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
}

beforeEach(() => {
    matchMediaFactory(false);
});

describe("Responder", () => {
    it("Should contain the config passed to it as a property", () => {
        const pageResponder = new Responder(CONF, ['small'], () => {}, () => {});
        should(pageResponder.config).not.be.undefined();
        should(pageResponder.config).be.equal(CONF);
    });

    it("Should have isValid method that return true", () => {
        const pageResponder = new Responder(
            CONF,
            ["mobile"],
            () => {},
            () => {}
        );
        should(pageResponder.isValid()).be.equal(true);
    });

    it("Should store a function passed as a parameter as the enter function", () => {
        const testFunction = () => {};
        const pageResponder = new Responder(
            CONF,
            ["small"],
            testFunction,
            () => {}
        );
        should(pageResponder.enterFunction).be.equal(testFunction);
    });

    it("Should store a function passed as a parameter as the exit function", () => {
        const testFunction = () => {};
        const pageResponder = new Responder(
            CONF,
            ["small"],
            () => {},
            testFunction
        );
        should(pageResponder.exitFunction).be.equal(testFunction);
    });

    it("Should throw an error if the array passed does not match any of the provided breakpoints in the config", () => {
        const setupResponder = () => {
            new Responder(
                CONF,
                ["notBreakpoint"],
                () => {},
                () => {}
            );
        }
        expect(setupResponder).toThrow()
    });

    const testData = {
        1: {
            conf: [{ label: "tablet", min: 1000, max: 2000 }],
            viewports: ["tablet"],
            expectedMinWidth: 1000,
            expectedMaxWidth: 2000,
        },
        2: {
            conf: [
                { label: "tablet", min: 1000, max: 2000 },
                { label: "desktop", min: 2001, max: 3000 },
            ],
            viewports: ["tablet", "desktop"],
            expectedMinWidth: 1000,
            expectedMaxWidth: 3000,
        },
        3: {
            conf: [
                { label: "mobile", min: 1000, max: 2000 },
                { label: "tablet", min: 100, max: 5000 },
                { label: "desktop", min: 2001, max: 3000 },
            ],
            viewports: ["mobile", "tablet", "desktop"],
            expectedMinWidth: 100,
            expectedMaxWidth: 5000,
        },
        4: {
            conf: [
                { label: "mobile", min: 1000, max: 2000 },
                { label: "tablet", min: 100, max: 5000 },
                { label: "desktop", min: 2001, max: 3000 },
            ],
            viewports: ["mobile", "desktop"],
            expectedMinWidth: 1000,
            expectedMaxWidth: 3000,
        },
    };
    describe("Setup", () => {
        Object.values(testData).forEach((data) => {
            it(`Should result in the maximum and minimumdomwidth properties being equal to ${data.expectedMaxWidth} and ${data.expectedMinWidth}`, () => {
                const pageResponder = new Responder(
                    data.conf,
                    data.viewports,
                    null,
                    null
                );
                pageResponder.setup();
                should(pageResponder.minimumDomWidth).be.equal(data.expectedMinWidth);
                should(pageResponder.maximumDomWidth).be.equal(data.expectedMaxWidth);
            });
        });
        
        describe("Sets up a media change event listener which", () => {
            it("Should contain a callback passed as an argument", ()=> {
                const addEventListener = jest.fn()
                Object.defineProperty(window, "matchMedia", {
                    writable: true,
                    value: jest.fn().mockImplementation((query: String) => ({
                        matches: false,
                        media: query,
                        onchange: null,
                        addEventListener: addEventListener,
                        removeEventListener: jest.fn(),
                        dispatchEvent: jest.fn(),
                    })),
                });

                const pageResponder = new Responder(
                    CONF,
                    ["mobile"],
                    () => {},
                    () => {}
                );
                pageResponder.setup()
                expect(addEventListener).toHaveBeenCalledWith('change', pageResponder.defineFunctionToRunEvent);
            });
        });
    });
});
