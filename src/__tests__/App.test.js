import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { act } from 'react-dom/test-utils';

describe('the whole app', () => {
  const dummyTask = {
    text: 'cook green eggs and ham',
    assignee: 'Sam I Am',
    difficulty: 3,
    completed: true,
  };

  const secondDummy = {
    text: 'take shower',
    assignee: 'Bob Saget',
    difficulty: 1,
    completed: false,
  };

  const trueClickEvent = {
    target: {
      checked: true,
    },
  };

  const falseClickEvent = {
    target: {
      checked: false,
    },
  };

  let app;

  beforeAll(async () => {
    await act(async () => {
      app = mount(<App />, { attachTo: document.title });
    });
  });

  const fillOutForm = (component, taskObj) => {
    expect(component).toBeDefined();

    const todoForm = component.find('#main-content');
    component.find('form').getDOMNode().novalidate = false;
    expect(todoForm).toBeDefined();
    expect(todoForm.find('h2').text()).toBe('ToDo Form');

    const taskTextarea = todoForm.find('textarea#task-description');
    expect(taskTextarea).toBeDefined();
    const descriptionEvent = {
      target: {
        value: taskObj.text,
      },
    };
    taskTextarea.simulate('change', descriptionEvent);
    taskTextarea.getDOMNode().required = false;

    const taskOwner = todoForm.find('input#task-person');
    expect(taskOwner).toBeDefined();
    const ownerEvent = {
      target: {
        value: taskObj.assignee,
      },
    };
    taskOwner.simulate('change', ownerEvent);
    taskOwner.getDOMNode().required = false;

    const taskDifficulty = todoForm.find('select#task-difficulty');
    expect(taskDifficulty).toBeDefined();
    const difficultyEvent = {
      target: {
        value: taskObj.difficulty,
      },
    };

    taskDifficulty.simulate('change', difficultyEvent);
    taskDifficulty.getDOMNode().required = false;

    const checkboxSection = component.find('#task-completed-checkbox-form');
    const checkboxInput = checkboxSection.find('input');

    if (taskObj.completed) {
      checkboxInput.simulate('change', trueClickEvent);
      checkboxInput.getDOMNode().checked = true;
    } else {
      checkboxInput.simulate('change', falseClickEvent);
      checkboxInput.getDOMNode().checked = false;
    }
  };

  const submitAndChangePage = (component) => {
    const form = component.find('form');
    form.simulate('submit');

    const todoList = component.find('#main-content');
    expect(todoList.find('h2').text()).toBe('Tasks ToDo');
  };

  const verifyCardContents = (card, task) => {
    const firstCardBody = card.find('.card-body').at(0);

    expect(firstCardBody.childAt(0).text()).toBe('description: ' + task.text);
    expect(firstCardBody.childAt(1).text()).toBe(
      'assigned to: ' + task.assignee
    );
    expect(firstCardBody.childAt(2).text()).toBe(
      'difficulty: ' + task.difficulty
    );

    expect(firstCardBody.childAt(3).text()).toBe('completed');

    const deleteContainer = card.find('.card-body').at(1);
    expect(deleteContainer.text()).toBe('Delete');
  };

  it('can go through the whole submission and list checking process', () => {
    fillOutForm(app, dummyTask);
    submitAndChangePage(app);
    expect(app.find('.card-header').text()).toBe('Task 1');

    const firstCard = app.find('.card-body-group');
    verifyCardContents(firstCard, dummyTask);
    expect(document.title).toBe('ToDo: 0 tasks incomplete');

    const firstCheckbox = firstCard.find('input');
    firstCheckbox.simulate('change', falseClickEvent);
    expect(document.title).toBe('ToDo: 1 task incomplete');

    firstCheckbox.simulate('change', trueClickEvent);
    expect(document.title).toBe('ToDo: 0 tasks incomplete');

    const navLinks = app.find('.nav-link');
    navLinks.at(0).simulate('click', { button: 0 });
  });

  it('can go through through a second form submission and see the first and second tasks on the tasks page', () => {
    fillOutForm(app, secondDummy);
    submitAndChangePage(app);

    expect(app.find('.card-header').at(0).text()).toBe('Task 1');
    expect(app.find('.card-header').at(1).text()).toBe('Task 2');

    const firstCard = app.find('.card-body-group').at(0);
    const secondCard = app.find('.card-body-group').at(1);
    verifyCardContents(secondCard, secondDummy);

    expect(document.title).toBe('ToDo: 1 task incomplete');

    const firstCheckbox = firstCard.find('input').at(0);
    firstCheckbox.simulate('change', falseClickEvent);
    expect(document.title).toBe('ToDo: 2 tasks incomplete');

    const secondCheckbox = secondCard.find('input').at(0);
    secondCheckbox.simulate('change', trueClickEvent);
    firstCheckbox.simulate('change', trueClickEvent);

    expect(document.title).toBe('ToDo: 0 tasks incomplete');
  });
});
