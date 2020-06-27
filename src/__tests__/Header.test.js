import React from 'react';
import { render } from 'enzyme';
import Header from '../components/Header';
import { BrowserRouter } from 'react-router-dom';

describe('header component', () => {
  it('displays the proper html and text on render', () => {
    const component = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(component).toBeDefined();

    const h1Tag = component.find('h1');
    expect(h1Tag).toBeDefined();
    expect(h1Tag.text()).toBe('ToDo List');
  });
});
