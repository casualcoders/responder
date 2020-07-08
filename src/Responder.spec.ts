import should from 'should';
import Responder from './Responder';

function matchMediaFactory(matches) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
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
  matchMediaFactory(false)
})
describe('Responder', () => {
  it('Should contain the config passed to it as a property', () => {
    const conf = ['desktop']
    const pageResponder = new Responder([], conf);
    should(pageResponder.config).not.be.undefined();
    should(pageResponder.config).be.equal(conf);
  })

  it('Should have validate method that return true', () => {
    const pageResponder = new Responder(['mobile'], ['desktop', 'table', 'mobile', 'small']);
    should(pageResponder.validate()).be.equal(true);
  })

  it('Should store a function passed as a parameter as the enter function', () => {
    const testFunction= () => {}
    const pageResponder = new Responder(['notBreakpoint'], ['desktop', 'table', 'mobile', 'small'], testFunction);
    should(pageResponder.enterFunction).be.equal(testFunction);
  })

  it('Should store a function passed as a parameter as the exit function', () => {
    const testFunction= () => {}
    const pageResponder = new Responder(['notBreakpoint'], ['desktop', 'table', 'mobile', 'small'], ()=> {}, testFunction);
    should(pageResponder.exitFunction).be.equal(testFunction);
  })
});

describe('PageResponder Setup', () => {
  const testData = {
    1: {viewports: ['tablet'], conf: [{label: 'tablet', min: 1000, max: 2000}], expectedMinWidth: 1000, expectedMaxWidth: 2000},
    2: {viewports: ['tablet', 'desktop'], conf: [{label: 'tablet', min: 1000, max: 2000}, {label: 'desktop', min: 2001, max: 3000}], expectedMinWidth: 1000, expectedMaxWidth: 3000},
    3: {viewports: ['mobile', 'tablet', 'desktop'], conf: [{label: 'mobile', min: 1000, max: 2000}, {label: 'tablet', min: 100, max: 5000}, {label: 'desktop', min: 2001, max: 3000}], expectedMinWidth: 100, expectedMaxWidth: 5000},
    4: {viewports: ['mobile', 'desktop'], conf: [{label: 'mobile', min: 1000, max: 2000}, {label: 'tablet', min: 100, max: 5000}, {label: 'desktop', min: 2001, max: 3000}], expectedMinWidth: 1000, expectedMaxWidth: 3000}
  };
  
  Object.values(testData).forEach(data => {
    it(`Should result in the maximum and minimumdomwidth properties being equal to ${data.expectedMaxWidth} and ${data.expectedMinWidth}`, () => {
      const pageResponder = new Responder(data.viewports, data.conf, null, null, true);
      pageResponder.setup()
      should(pageResponder.minimumDomWidth).be.equal(data.expectedMinWidth);
      should(pageResponder.maximumDomWidth).be.equal(data.expectedMaxWidth);
    })
  });
  
  it('should run the enter function if match media returns matches as true', () => {
    matchMediaFactory(true);
    const conf = [{label: 'mobile', min: 1000, max: 2000}, {label: 'tablet', min: 100, max: 5000}, {label: 'desktop', min: 2001, max: 3000}]
    const exitFn = jest.fn()
    const enterFn = jest.fn()
    const pageResponder = new Responder(['mobile', 'tablet', 'desktop'], conf, enterFn, exitFn);
    pageResponder.setup()
    expect(pageResponder.matchObject.matches).toBe(true);
    expect(enterFn.mock.calls.length).toBe(1);
  })

  it('should run the exit function if match media returns matches as false', () => {
    matchMediaFactory(false);
    const conf = [{label: 'mobile', min: 1000, max: 2000}, {label: 'tablet', min: 100, max: 5000}, {label: 'desktop', min: 2001, max: 3000}]
    const exitFn = jest.fn()
    const enterFn = jest.fn()
    const pageResponder = new Responder(['mobile', 'tablet', 'desktop'], conf, enterFn, exitFn);
    pageResponder.setup()
    expect(pageResponder.matchObject.matches).toBe(false);
    expect(exitFn.mock.calls.length).toBe(1);
  })
})

describe('Responder validate method', () => {
  it('Should return false if the array passed does not match any of the provided breakpoints in the config', () => {
    const pageResponder = new Responder(['notBreakpoint'], ['desktop', 'table', 'mobile', 'small']);
    should(pageResponder.validate()).be.equal(false);
  })
});