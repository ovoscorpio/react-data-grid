

let React              = require('react');
let TestUtils          = require('react/lib/ReactTestUtils');
let rewire             = require('rewire');
let rewireModule       = require('../../../../test/rewireModule');
let StubComponent      = require('../../../../test/StubComponent');
let AutoCompleteEditor = rewire('../AutoCompleteEditor');

describe('AutoCompleteEditor', () => {
  let component;
  function fakeCb() { return true; }
  let fakeOptions = [{id: 1, title: 'test-result1'}, {id: 2, title: 'test-result2'}];
  let fakeParams = ['param1', 'param2', 'param3'];
  let fakeColumn = { key: 'autocomplete', name: 'name', width: 0 };
  let fakeLabelFn = function(item) { return item; };


  describe('Unit Tests', () => {
    let ReactAutocompleteStub = new StubComponent('ReactAutocomplete');

    // Configure local letiable replacements for the module.
    rewireModule(AutoCompleteEditor, {
      ReactAutocomplete: ReactAutocompleteStub
    });

    describe('Basic tests', () => {
      beforeEach(() => {
        component = TestUtils.renderIntoDocument(<AutoCompleteEditor
          onCommit={fakeCb}
          options={fakeOptions}
          label="title"
          value="value"
          valueParams={fakeParams}
          column={fakeColumn}
          resultIdentifier="id"
          search="test"
          height={30}
          onKeyDown={fakeCb}/>);
      });

      it('should create a new AutoCompleteEditor instance', () => {
        expect(component).toBeDefined();
      });

      it('should render a ReactAutocomplete component', () => {
        let Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocompleteStub);
        expect(Autocomplete).toBeDefined();
      });

      it('should pass the search text to ReachAutocomplete as a prop', () => {
        let Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocompleteStub);
        expect(Autocomplete.props.search).toBeDefined('test');
      });

      it('should pass the label to ReachAutocomplete as a prop', () => {
        let Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocompleteStub);
        expect(Autocomplete.props.label).toBeDefined('autocomplete');
      });

      it('should pass the resultIdentifier to ReachAutocomplete as a prop', () => {
        let Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocompleteStub);
        expect(Autocomplete.props.resultIdentifier).toBeDefined('id');
      });

      it('should pass the options to ReachAutocomplete as a prop', () => {
        let Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocompleteStub);
        expect(Autocomplete.props.options).toBeDefined(fakeOptions);
      });

      it('should pass the value to ReachAutocomplete as a prop', () => {
        let Autocomplete = TestUtils.findRenderedComponentWithType(component, ReactAutocompleteStub);
        expect(Autocomplete.props.value.title).toBeDefined('value');
      });

      it('should construct values from the parameters', () => {
        let constructedValues = component.constuctValueFromParams({param1: 'value1', param2: 'value2'}, fakeParams);
        expect(constructedValues).toBe('value1|value2|');
      });

      it('should return the value for getLabel if item is a string', () => {
        let value = component.getLabel({title: 'autocomplete'});
        expect(value).toBe('autocomplete');
      });
    });

    describe('With different props', () => {
      beforeEach(() => {
        component = TestUtils.renderIntoDocument(<AutoCompleteEditor
          onCommit={fakeCb}
          options={fakeOptions}
          label={fakeLabelFn}
          value="value"
          valueParams={fakeParams}
          column={fakeColumn}
          resultIdentifier="id"
          search="test"
          height={30}
          onKeyDown={fakeCb}/>);
      });

      it('should return the value for getLabel if item is a function', () => {
        let value = component.getLabel('autocomplete');
        expect(value).toBe('autocomplete');
      });
    });
  });
});
