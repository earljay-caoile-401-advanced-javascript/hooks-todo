import React from 'react';
import { render } from 'enzyme';
import Footer from '../components/Footer';

describe('footer component', () => {
  it('displays the proper html and text on render', () => {
    const component = render(<Footer />);
    expect(component).toBeDefined();

    const pTag = component.find('p');
    expect(pTag).toBeDefined();
    expect(pTag.text()).toBe('Created by Earl Jay Caoile');

    const urlIcons = component.find('.url-icons');
    expect(urlIcons).toBeDefined();

    const aTags = urlIcons.find('a');
    expect(aTags).toHaveLength(2);

    const gitHubSvg = urlIcons.find('svg.fa-github');
    const linkedInSvg = urlIcons.find('svg.fa-linkedin');
    expect(gitHubSvg).toBeDefined();
    expect(linkedInSvg).toBeDefined();
  });
});
