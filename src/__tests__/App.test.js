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

    const taskOwner = todoForm.find('input#task-person');
    expect(taskOwner).toBeDefined();
    const ownerEvent = {
      target: {
        value: taskObj.assignedTo,
      },
    };
    taskOwner.simulate('change', ownerEvent);

    const taskDifficulty = todoForm.find('select#task-difficulty');
    expect(taskDifficulty).toBeDefined();
    const difficultyEvent = {
      target: {
        value: taskObj.difficulty,
      },
    };

    taskDifficulty.simulate('change', difficultyEvent);

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
    const submitBtn = component.find('button.btn-info');
    expect(submitBtn).toBeDefined();
    submitBtn.simulate('click');

    const todoList = component.find('#main-content');
    expect(todoList.find('h2').text()).toBe('Tasks ToDo');
  };

  const verifyCardContents = (card, task) => {
    expect(card.childAt(0).text()).toBe('description: ' + task.description);
    expect(card.childAt(1).text()).toBe('assigned to: ' + task.assignedTo);
    expect(card.childAt(2).text()).toBe('difficulty: ' + task.difficulty);

    expect(card.childAt(3).text()).toBe('completed');
  };

  it('can go through the whole submission and list checking process', () => {
    const app = mount(<App />, { attachTo: document.title });

    fillOutForm(app, dummyTask);

    submitAndChangePage(app);

    expect(app.find('.card-header').text()).toBe('Task 1');

    const firstCard = app.find('.card-body');

    verifyCardContents(firstCard, dummyTask);
    expect(document.title).toBe('ToDo: 1 task incomplete');

    const checkboxSection = firstCard.childAt(3);
    const checkboxInput = checkboxSection.find('input');

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

    checkboxInput.simulate('change', trueClickEvent);
    expect(document.title).toBe('ToDo: 0 tasks incomplete');

    checkboxInput.simulate('change', falseClickEvent);
    expect(document.title).toBe('ToDo: 1 task incomplete');

    const navLinks = app.find('.nav-link');
    navLinks.at(0).simulate('click', { button: 0 });

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
  });
});
