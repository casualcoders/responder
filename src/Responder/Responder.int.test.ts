import should from "should";
import Responder from "./Responder";

const CONF = [
    { label: 'small', min: 0, max: 575 },
    { label: 'mobile', min: 576, max: 767 },
    { label: 'tablet', min: 768, max: 991 },
    { label: 'desktop', min: 992, max: 1199 },
    { label: 'big', min: 1200, max: 9999 }
]

describe("Responder", () => {
    it("Should run the enter function provided when the browser is resized inside the desired viewports", ()=> {
        const enterFn = jest.fn()
        const exitFn = jest.fn()
        const pageResponder = new Responder(
            CONF,
            ["mobile"],
            enterFn,
            exitFn
        );
        pageResponder.setup()
    });
});