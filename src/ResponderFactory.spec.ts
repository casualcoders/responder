import should from 'should';
import ResponderFactory from './ResponderFactory';
import Responder from './Responder';

const BREAKPOINTS = {
    sm: { label: 'small', enter: 0, exit: 575 },
    mobile: { label: 'mobile', enter: 576, exit: 767 },
    tablet: { label: 'tablet', enter: 768, exit: 991 },
    desktop: { label: 'desktop', enter: 992, exit: 1199 },
    xl: { label: 'big', enter: 1200, exit: 9999 }
}
describe('ResponderFactory', () => {
    describe('On new instance creation', () => {
        it('It should have a breakpoint property equal to the parameter', () => {
            let responderFactory = new ResponderFactory(BREAKPOINTS)
            should(responderFactory.breakpoints).be.equal(BREAKPOINTS);
        })

        it('It should return an instance of Responder Class', () => {
            let responderFactory = new ResponderFactory(BREAKPOINTS)
            should(typeof(responderFactory)).be.equal(typeof(new Responder()))
        })
    })
})