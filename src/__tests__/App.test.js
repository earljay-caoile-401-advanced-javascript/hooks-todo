import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

describe('the whole app', () => {
  const dummyTask = {
    description: 'cook green eggs and ham',
    assignedTo: 'Sam I Am',
    difficulty: 3,
    wasCompleted: false,
  };

  const secondDummy = {
    description: 'take shower',
    assignedTo: 'Bob Saget',
    difficulty: 1,
    wasCompleted: true,
  };

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
        value: taskObj.description,
      },
    };
    taskTextarea.simulate('change', descriptionEvent);
    taskTextarea.getDOMNode().required = false;

    const taskOwner = todoForm.find('input#task-person');
    expect(taskOwner).toBeDefined();
    const ownerEvent = {
      target: {
        value: taskObj.assignedTo,
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

    if (taskObj.wasCompleted) {
      const trueClickEvent = {
        target: {
          checked: true,
        },
      };

      const checkboxSection = component.find('#task-completed-checkbox-form');
      const checkboxInput = checkboxSection.find('input');
      checkboxInput.simulate('change', trueClickEvent);
    }
  };

  const submitAndChangePage = (component) => {
    const form = component.find('form');
    form.simulate('submit');

    const todoList = component.find('#main-content');
    expect(todoList.find('h2').text()).toBe('Tasks ToDo');
  };

  const verifyCardContents = (card, task) => {
    expect(card.childAt(0).text()).toBe('description: ' + task.description);
    expect(card.childAt(1).text()).toBe('assigned to: ' + task.assignedTo);
    expect(card.childAt(2).text()).toBe('difficulty: ' + task.difficulty);

    expect(card.childAt(3).text()).toBe('completed');
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

  const app = mount(<App />, { attachTo: document.title });

  it('can go through the whole submission and list checking process', () => {
    fillOutForm(app, dummyTask);

    submitAndChangePage(app);

    expect(app.find('.card-header').text()).toBe('Task 1');

    const firstCard = app.find('.card-body');

    verifyCardContents(firstCard, dummyTask);
    expect(document.title).toBe('ToDo: 1 task incomplete');

    const firstCheckbox = firstCard.find('input');
    firstCheckbox.simulate('change', trueClickEvent);
    expect(document.title).toBe('ToDo: 0 tasks incomplete');

    firstCheckbox.simulate('change', falseClickEvent);
    expect(document.title).toBe('ToDo: 1 task incomplete');

    const navLinks = app.find('.nav-link');
    navLinks.at(0).simulate('click', { button: 0 });
  });

  it('can go through through a second form submission and see the first and second tasks on the tasks page', () => {
    fillOutForm(app, secondDummy);
    submitAndChangePage(app);

    expect(app.find('.card-header').at(0).text()).toBe('Task 1');
    expect(app.find('.card-header').at(1).text()).toBe('Task 2');

    const secondCard = app.find('.card-body').at(1);

    verifyCardContents(secondCard, secondDummy);
    expect(document.title).toBe('ToDo: 1 task incomplete');

    const secondCheckbox = secondCard.find('input');
    secondCheckbox.simulate('change', falseClickEvent);
    expect(document.title).toBe('ToDo: 2 tasks incomplete');

    secondCheckbox.simulate('change', trueClickEvent);
    const firstCard = app.find('.card-body').at(0);
    const firstCheckbox = firstCard.find('input');
    firstCheckbox.simulate('change', trueClickEvent);
    expect(document.title).toBe('ToDo: 0 tasks incomplete');
  });
});
