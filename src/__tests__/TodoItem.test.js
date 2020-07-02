import React from 'react';
import { render } from 'enzyme';
import ToDoItem from '../components/ToDoItem';

describe('ToDoItem component', () => {
  it('displays the proper html and text on render', () => {
    const dummyTask = {
      text: 'cook green eggs and ham',
      assignee: 'Sam I Am',
      difficulty: 3,
      complete: false,
    };

    const component = render(<ToDoItem task={dummyTask} index={0} />);
    expect(component).toBeDefined();

    const cardHeader = component.find('.card-header');
    expect(cardHeader.text()).toBe('Task 1');

    const description = component.find('.card-text');
    expect(description).toBeDefined();

    const descText = description.text();
    expect(
      descText.includes('description: cook green eggs and ham')
    ).toBeTruthy();

    expect(descText.includes('assigned to: Sam I Am')).toBeTruthy();
    expect(descText.includes('difficulty: 3')).toBeTruthy();
    expect(descText.includes('completed')).toBeFalsy();
  });
});
