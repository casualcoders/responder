import should from 'should';
import Responder from './Responder';
import CONF from './config'

describe('Responder', () => {
  it('Should contain the config passed to it as a property', () => {
    const pageResponder = new Responder([], CONF);
    should(pageResponder.config).not.be.undefined();
    should(pageResponder.config).be.equal(CONF);
  })

  it('Should have validate method that return true', () => {
    const pageResponder = new Responder(['mobile'], CONF);
    should(pageResponder.validate()).be.equal(true);
  })

  it('Should store a function passed as a parameter as the enter function', () => {
    const testFunction= () => {}
    const pageResponder = new Responder(['notBreakpoint'], CONF, testFunction);
    should(pageResponder.enterFunction).be.equal(testFunction);
  })

  it('Should store a function passed as a parameter as the exit function', () => {
    const testFunction= () => {}
    const pageResponder = new Responder(['notBreakpoint'], CONF, ()=> {}, testFunction);
    should(pageResponder.exitFunction).be.equal(testFunction);
  })

  it('Should fire the enter function if the current breakpoint is in the array passed', () => {
    let macthMD = true
    const testTabletEnterFunction = () => { return 'tabletEnterFunctionReturn'}
    const testTabletExitFunction = () => { return 'tabletExitFunctionReturn'}
    const pageResponder = new Responder(['tablet'], CONF, testTabletEnterFunction, testTabletExitFunction, macthMD);
    should(pageResponder.defineFunctionToRun()).be.equal('tabletEnterFunctionReturn');
  })

  it('Should fired the exit function is the current breakpoint is not the array passed', () => {
    let macthMD = false
    const testTabletEnterFunction = () => { return 'tabletEnterFunctionReturn'}
    const testTabletExitFunction = () => { return 'tabletExitFunctionReturn'}
    const pageResponder = new Responder(['tablet'], CONF, testTabletEnterFunction, testTabletExitFunction, macthMD);
    should(pageResponder.defineFunctionToRun()).be.equal('tabletExitFunctionReturn');
  })
});

describe('PageResponder Setup', () => {
  
  it('Should result in the maximum and minimumdomwidth properties, which correspond to the minimum and maximum matching config breakpoint enter and exit values, being populated', () => {
    let conf = [{name: 'tablet', min: 1000, max: 2000}]
    const pageResponder = new Responder(['tablet'], conf, null, null, true);
    pageResponder.setup()
    should(pageResponder.minimumDomWidth).be.equal(conf[0].min);
    should(pageResponder.maximumDomWidth).be.equal(conf[0].max);
  })

  it('Should result in the maximum and minimumdomwidth properties, which correspond to the minimum matching config breakpoint enter value and the maximum matching config breakpoint exit value, being populated', () => {
    const conf = [{name: 'tablet', min: 1000, max: 2000}, {name: 'desktop', min: 2001, max: 3000}]
    const pageResponder = new Responder(['tablet', 'desktop'], conf, null, null, true);
    pageResponder.setup()
    should(pageResponder.minimumDomWidth).be.equal(conf[0].min);
    should(pageResponder.maximumDomWidth).be.equal(conf[1].max);
  })

  it('Should result in the maximum and minimumdomwidth properties, which correspond to the minimum matching config breakpoint enter value and the maximum matching config breakpoint exit value, being populated', () => {
    const conf = [{name: 'mobile', min: 1000, max: 2000}, {name: 'tablet', min: 100, max: 5000}, {name: 'desktop', min: 2001, max: 3000}]
    const pageResponder = new Responder(['mobile', 'tablet', 'desktop'], conf, null, null, true);
    pageResponder.setup()
    should(pageResponder.minimumDomWidth).be.equal(conf[1].min);
    should(pageResponder.maximumDomWidth).be.equal(conf[1].max);
  })

  it('Should result in the maximum and minimumdomwidth properties, which correspond to the minimum matching config breakpoint enter value and the maximum matching config breakpoint exit value, being populated', () => {
    const conf = [{name: 'mobile', min: 1000, max: 2000}, {name: 'tablet', min: 100, max: 5000}, {name: 'desktop', min: 2001, max: 3000}]
    const pageResponder = new Responder(['mobile', 'desktop'], conf, null, null, true);
    pageResponder.setup()
    should(pageResponder.minimumDomWidth).be.equal(conf[0].min);
    should(pageResponder.maximumDomWidth).be.equal(conf[2].max);
  })
  
  it('should run the enter function if the current viewport is between the minimum and maximum view widths', () => {
    document.body.clientWidth = 500
    const conf = [{name: 'mobile', min: 1000, max: 2000}, {name: 'tablet', min: 100, max: 5000}, {name: 'desktop', min: 2001, max: 3000}]
    const enterFn = jest.fn()
    const pageResponder = new Responder(['mobile', 'tablet', 'desktop'], conf, enterFn, null, true);
    pageResponder.setup()
    expect(enterFn.mock.calls.length).toBe(1);
  })
})

describe('Responder validate method', () => {
  it('Should return false if the array passed does not match any of the provided breakpoints in the config', () => {
    const pageResponder = new Responder(['notBreakpoint'], CONF);
    should(pageResponder.validate()).be.equal(false);
  })
});
