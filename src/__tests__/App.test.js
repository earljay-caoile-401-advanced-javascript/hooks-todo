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

  it('can go through the whole submission and list checking process', () => {
    const app = mount(<App />, { attachTo: document.title });
    
    fillOutForm(app, dummyTask);

    const submitBtn = app.find('button.btn-info');
    expect(submitBtn).toBeDefined();
    submitBtn.simulate('click');

    const todoList = app.find('#main-content');
    expect(todoList.find('h2').text()).toBe('Tasks ToDo');
    expect(todoList.find('.card-header').text()).toBe('Task 1');

    const cardBody = todoList.find('.card-body');
    expect(cardBody.childAt(0).text()).toBe(
      'description: ' + dummyTask.description
    );
    expect(cardBody.childAt(1).text()).toBe(
      'assigned to: ' + dummyTask.assignedTo
    );
    expect(cardBody.childAt(2).text()).toBe(
      'difficulty: ' + dummyTask.difficulty
    );

    const checkboxSection = cardBody.childAt(3);
    expect(checkboxSection.text()).toBe('completed');
    expect(document.title).toBe('ToDo: 1 task incomplete');

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
  });
});
