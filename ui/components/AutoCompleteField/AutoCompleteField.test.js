import React from 'react';
import { render, screen } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import AutoCompleteField from './AutoCompleteField';
import { Formik } from "formik";
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

    expect(container.querySelector('.c-input-work-container') != null).toBe(true)

  })
})
