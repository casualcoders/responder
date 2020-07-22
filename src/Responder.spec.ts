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
        const pageResponder = new Responder([], CONF, ()=>{}, ()=>{});
        should(pageResponder.config).not.be.undefined();
        should(pageResponder.config).be.equal(CONF);
    });

    it("Should have validate method that return true", () => {
        const pageResponder = new Responder(
            ["mobile"],
            CONF,
            ()=>{},
            ()=>{}
        );
        should(pageResponder.validate()).be.equal(true);
    });

    it("Should store a function passed as a parameter as the enter function", () => {
        const testFunction = () => {};
        const pageResponder = new Responder(
            ["notBreakpoint"],
            CONF,
            testFunction,
            ()=>{}
        );
        should(pageResponder.enterFunction).be.equal(testFunction);
    });

    it("Should store a function passed as a parameter as the exit function", () => {
        const testFunction = () => {};
        const pageResponder = new Responder(
            ["notBreakpoint"],
            CONF,
            () => {},
            testFunction
        );
        should(pageResponder.exitFunction).be.equal(testFunction);
    });

    describe("Create a Macth Media Object", () => {
        it("Should return match media object with the min and max with breakpoint specified on the conf object", () => {
            matchMediaFactory(true);
        });
    });

    describe("Setup", () => {
        const testData = {
            1: {
                viewports: ["tablet"],
                conf: [{ label: "tablet", min: 1000, max: 2000 }],
                expectedMinWidth: 1000,
                expectedMaxWidth: 2000,
            },
            2: {
                viewports: ["tablet", "desktop"],
                conf: [
                    { label: "tablet", min: 1000, max: 2000 },
                    { label: "desktop", min: 2001, max: 3000 },
                ],
                expectedMinWidth: 1000,
                expectedMaxWidth: 3000,
            },
            3: {
                viewports: ["mobile", "tablet", "desktop"],
                conf: [
                    { label: "mobile", min: 1000, max: 2000 },
                    { label: "tablet", min: 100, max: 5000 },
                    { label: "desktop", min: 2001, max: 3000 },
                ],
                expectedMinWidth: 100,
                expectedMaxWidth: 5000,
            },
            4: {
                viewports: ["mobile", "desktop"],
                conf: [
                    { label: "mobile", min: 1000, max: 2000 },
                    { label: "tablet", min: 100, max: 5000 },
                    { label: "desktop", min: 2001, max: 3000 },
                ],
                expectedMinWidth: 1000,
                expectedMaxWidth: 3000,
            },
        };

        Object.values(testData).forEach((data) => {
            it(`Should result in the maximum and minimumdomwidth properties being equal to ${data.expectedMaxWidth} and ${data.expectedMinWidth}`, () => {
                const pageResponder = new Responder(
                    data.viewports,
                    data.conf,
                    null,
                    null
                );
                pageResponder.setup();
                should(pageResponder.minimumDomWidth).be.equal(data.expectedMinWidth);
                should(pageResponder.maximumDomWidth).be.equal(data.expectedMaxWidth);
            });
        });

        it("should run the enter function if match media returns matches as true", () => {
            matchMediaFactory(true);
            const conf = [
                { label: "mobile", min: 1000, max: 2000 },
                { label: "tablet", min: 100, max: 5000 },
                { label: "desktop", min: 2001, max: 3000 },
            ];
            const exitFn = jest.fn();
            const enterFn = jest.fn();
            const pageResponder = new Responder(
                ["mobile", "tablet", "desktop"],
                conf,
                enterFn,
                exitFn
            );
            pageResponder.setup();
            expect(pageResponder.matchObject.matches).toBe(true);
            expect(enterFn.mock.calls.length).toBe(1);
        });

        it("should run the exit function if match media returns matches as false", () => {
            matchMediaFactory(false);
            const conf = [
                { label: "mobile", min: 1000, max: 2000 },
                { label: "tablet", min: 100, max: 5000 },
                { label: "desktop", min: 2001, max: 3000 },
            ];
            const exitFn = jest.fn();
            const enterFn = jest.fn();
            const pageResponder = new Responder(
                ["mobile", "tablet", "desktop"],
                conf,
                enterFn,
                exitFn
            );
            pageResponder.setup();
            expect(pageResponder.matchObject.matches).toBe(false);
            expect(exitFn.mock.calls.length).toBe(1);
        });
    });

    describe("Responder validate method", () => {
        it("Should return false if the array passed does not match any of the provided breakpoints in the config", () => {
            const pageResponder = new Responder(
                ["notBreakpoint"],
                CONF,
                ()=>{},
                ()=>{}
            );
            should(pageResponder.validate()).be.equal(false);
        });
    });
});
