import React from 'react';
import { render } from '@testing-library/react';
import AutoCompleteField from './AutoCompleteField';
import { Formik, Form, Field, ErrorMessage } from "formik";
import {noop} from "lodash/noop";

describe('AutoCompleteField', () => {
  it('Renders static image and text', () => {
    const { container } = render(
      <Formik>
        <AutoCompleteField items={[]}
                      itemToStringFunction={noop}
                      onSelectedItemChangeFunction={noop}
                      compareItemFunction={noop}
                      onInputValueChangeFunction={noop}
                      name="jobField"
                      placeholder="ex: plomberie" />
      </Formik>)
    expect(container.firstChild.classList.contains('autoCompleteContainer')).toBe(true)
  })
})
