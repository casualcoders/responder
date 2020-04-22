import should from 'should';
import Responder from '../../src/Responder';
import CONF from '../../src/config'

describe('Responder', () => {
  it('Responder should be initialized', () => {
    const pageResponder = new Responder();
    should(pageResponder).not.be.undefined();
    pageResponder.should.be.an.instanceOf(Responder);
  })

  it('It should have an array as an input', () => {
    const pageResponder = new Responder([]);    
  })
  
  it('Should contain the config passed to it as a property', () => {
    const pageResponder = new Responder([], CONF);
    should(pageResponder.config).not.be.undefined();
    should(pageResponder.config).be.equal(CONF);
  })

  it('It should have validate method that return true', () => {
    const pageResponder = new Responder(['mobile'], CONF);
    should(pageResponder.validate()).be.equal(true);
  })

  it('the validate method should return false if the array passed does not match any of the provided breakpoints in the config', () => {
    const pageResponder = new Responder(['notBreakpoint'], CONF);
    should(pageResponder.validate()).be.equal(false);
  })

  it('Should store a function passed as a parameter as the enter function', () => {
    const testFunction= () => {}
    const pageResponder = new Responder(['notBreakpoint'], CONF, testFunction);
    should(pageResponder.enter).be.equal(testFunction);
  })

  it('Should store a function passed as a parameter as the exit function', () => {
    const testFunction= () => {}
    const pageResponder = new Responder(['notBreakpoint'], CONF, ()=> {}, testFunction);
    should(pageResponder.exit).be.equal(testFunction);
  })

  it('It should fired the enter function is the current breakpoint is in the array passed', () => {
    let macthMD = true
    const testTabletEnterFunction = () => { return 'tabletEnterFunctionReturn'}
    const testTabletExitFunction = () => { return 'tabletExitFunctionReturn'}
    const pageResponder = new Responder(['tablet'], CONF, testTabletEnterFunction, testTabletExitFunction, macthMD);
    should(pageResponder.defineFunctionToRun()).be.equal('tabletEnterFunctionReturn');
  })

  it('It should fired the exit function is the current breakpoint is not the array passed', () => {
    let macthMD = false
    const testTabletEnterFunction = () => { return 'tabletEnterFunctionReturn'}
    const testTabletExitFunction = () => { return 'tabletExitFunctionReturn'}
    const pageResponder = new Responder(['tablet'], CONF, testTabletEnterFunction, testTabletExitFunction, macthMD);
    should(pageResponder.defineFunctionToRun()).be.equal('tabletExitFunctionReturn');
  })

  it('The intialised responder should contain properties of a maximum and minimum dom width, which correspond to the minimum and maximum matching config breakpoint enter and exit values', () => {
    let conf = [{name: 'tablet', min: 1000, max: 2000}]
    const pageResponder = new Responder(['tablet'], conf, null, null, true);
    should(pageResponder.minimumDomWidth).be.equal(conf[0].min);
    should(pageResponder.maximumDomWidth).be.equal(conf[0].max);
  })
  
});
