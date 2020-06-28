import React from 'react';
import { render } from 'enzyme';
import ToDoList from '../components/ToDoList';
import { BrowserRouter } from 'react-router-dom';

describe('ToDoList component', () => {
  it('displays the proper html and text on render', () => {
    const dummyTask = {
      text: 'cook green eggs and ham',
      assignedTo: 'Sam I Am',
      difficulty: 3,
      complete: false,
    };

    const otherTask = {
      text: 'take a shower',
      assignedTo: 'Bob Saget',
      difficulty: 1,
      complete: true,
    };

    const component = render(
      <BrowserRouter>
        <ToDoList tasks={[dummyTask, otherTask]} />
      </BrowserRouter>
    );
    expect(component).toBeDefined();

    const compText = component.text();
    expect(compText.includes('Tasks ToDo'));
    expect(
      compText.includes(
        'No tasks to show! Please return to the home page to add a task to the todo list.'
      )
    ).toBeTruthy();
    expect(compText.includes('Return to Form Page')).toBeTruthy();
  });
});
