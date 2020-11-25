import should from 'should';
import ResponderFactory from './ResponderFactory';
import Responder from './Responder';

const CONF = [
    { label: 'small', min: 0, max: 575 },
    { label: 'mobile', min: 576, max: 767 },
    { label: 'tablet', min: 768, max: 991 },
    { label: 'desktop', min: 992, max: 1199 },
    { label: 'big', min: 1200, max: 9999 }
]
describe('ResponderFactory', () => {
    describe('On new instance creation', () => {
        it('It should have a breakpoint property equal to the parameter', () => {
            let responderFactory = new ResponderFactory(CONF)
            should(responderFactory.breakpoints).be.equal(CONF);
        })
    })
    
    describe('On the createResponder method call', () => {
        it('It should return an instance of Responder Class', () => {
            let responderFactory = new ResponderFactory(CONF)
            const responder = responderFactory.createResponder(['small'], () => {}, () => {})
            should(typeof(responder)).be.equal(typeof(new Responder(CONF, ['small'],  () => {}, () => {} )))
        })

        it('A responder should be setup with the parameters passed to the method', () => {
            let responderFactory = new ResponderFactory(CONF)
            let viewports = ['small']
            const exitFn = jest.fn()
            const enterFn = jest.fn()
            const responder = responderFactory.createResponder(viewports, enterFn, exitFn)
            should(responder.config).be.equal(CONF);
            should(responder.viewports).be.equal(viewports);
            should(responder.enterFunction).be.equal(enterFn);
            should(responder.exitFunction).be.equal(exitFn);
        })
    })

    describe('On the createResponders method call', () => {
        it('It should return an array of instances of Responder Classes', () => {
            let responderFactory = new ResponderFactory(CONF)
            const responderConfs = [{viewports: ['small'], enterFn: () => {}, exitFn: () => {}},{viewports: ['small'], enterFn: () => {}, exitFn: () => {}}]
            const responders = responderFactory.createResponders(responderConfs)
            should(typeof(responders)).be.equal(typeof([]))
            should(responders.length).be.equal(responderConfs.length)
            for (let index = 0; index < responders.length; index++) {
                const responder = responders[index];
                should(typeof(responder)).be.equal(typeof(new Responder(CONF, ['small'],  () => {}, () => {} )))
            }
        })

        it('The returned responders should be setup with the parameters passed using the responderConfig', () => {
            let responderFactory = new ResponderFactory(CONF)
            let viewports = ['small']
            const exitFn = jest.fn()
            const enterFn = jest.fn()
            const responderConfs = [{viewports: viewports, enterFn: enterFn, exitFn: exitFn},{viewports: viewports, enterFn: enterFn, exitFn: exitFn}]
            const responders = responderFactory.createResponders(responderConfs)
            responders.forEach(responder => {
                should(responder.config).be.equal(CONF);
                should(responder.viewports).be.equal(viewports);
                should(responder.enterFunction).be.equal(enterFn);
                should(responder.exitFunction).be.equal(exitFn);
            });
        });
    })
})
