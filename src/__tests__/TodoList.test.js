import React from 'react';
import { render } from 'enzyme';
import ToDoList from '../components/ToDoList';
import { BrowserRouter } from 'react-router-dom';

describe('ToDoList component', () => {
  const dummyTask = {
    text: 'cook green eggs and ham',
    assignee: 'Sam I Am',
    difficulty: 3,
    complete: false,
  };

  const otherTask = {
    text: 'take a shower',
    assignee: 'Bob Saget',
    difficulty: 1,
    complete: true,
  };

  it('displays the proper initial html and text on render', () => {
    const component = render(
      <BrowserRouter>
        <ToDoList />
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

  it('displays the proper html when populated with tasks', () => {
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
    ).toBeFalsy();
    expect(compText.includes('Return to Form Page')).toBeFalsy();

    Object.keys(dummyTask).forEach((key) => {
      expect(compText.includes(dummyTask[key]));
    });

    Object.keys(otherTask).forEach((key) => {
      expect(compText.includes(otherTask[key]));
    });
  });
});
