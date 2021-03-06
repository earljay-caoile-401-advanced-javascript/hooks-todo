import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { act } from 'react-dom/test-utils';
const uuid = require('uuid').v4;

describe('the whole app', () => {
  const dummyTask = {
    text: 'cook green eggs and ham',
    assignee: 'Sam I Am',
    difficulty: 3,
    complete: true,
  };

  const secondDummy = {
    text: 'shouting expletives',
    assignee: 'Bob Saget',
    difficulty: 1,
    complete: false,
  };

  const thirdDummy = {
    text: 'work on my guns',
    assignee: 'Ron Burgundy',
    difficulty: 4,
    complete: false,
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
  const firstID = uuid();
  const secondID = uuid();
  const thirdID = uuid();

  beforeAll(async () => {
    await act(async () => {
      app = mount(<App />, { attachTo: document.title });
    });
  });

  const fillOutForm = async (component, taskObj) => {
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

    await taskTextarea.simulate('change', descriptionEvent);
    taskTextarea.getDOMNode().required = false;

    const taskOwner = todoForm.find('input#task-person');
    expect(taskOwner).toBeDefined();
    const ownerEvent = {
      target: {
        value: taskObj.assignee,
      },
    };

    await taskOwner.simulate('change', ownerEvent);
    taskOwner.getDOMNode().required = false;

    const taskDifficulty = todoForm.find('select#task-difficulty');
    expect(taskDifficulty).toBeDefined();
    const difficultyEvent = {
      target: {
        value: taskObj.difficulty,
      },
    };

    await taskDifficulty.simulate('change', difficultyEvent);
    taskDifficulty.getDOMNode().required = false;

    const checkboxSection = component.find('#task-completed-checkbox-form');
    const checkboxInput = checkboxSection.find('input');

    if (taskObj.complete) {
      await checkboxInput.simulate('change', trueClickEvent);
      checkboxInput.getDOMNode().checked = true;
    } else {
      await checkboxInput.simulate('change', falseClickEvent);
      checkboxInput.getDOMNode().checked = false;
    }
  };

  const submitAndChangePage = async (component) => {
    await act(async () => {
      const form = component.find('form');
      await form.simulate('submit');
      await component.update();

      const todoList = component.find('#main-content');
      expect(todoList.find('h2').text()).toBe('Tasks ToDo');
    });
  };

  const verifyCardContents = async (card, task) => {
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

  const mockFetchHelper = async (resBody, runGet, mockRes) => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ...resBody, testing: true }),
        runGet,
        mockGet: () => mockRes,
      })
    );
  };

  const returnToHomePage = async (component) => {
    const navLinks = component.find('.nav-link');
    await navLinks.at(0).simulate('click', { button: 0 });
  };

  test('can go through the whole submission and list checking process', async () => {
    await fillOutForm(app, dummyTask);
    await mockFetchHelper(
      { ...dummyTask, _id: firstID },
      true,
      Promise.resolve({
        json: () =>
          Promise.resolve({ results: [{ ...dummyTask, _id: firstID }] }),
      })
    );

    await act(async () => {
      await submitAndChangePage(app);
      await app.update();
    });
    expect(app.find('.card-header').text()).toBe('Task 1');

    const firstCard = app.find('.card-body-group');
    await verifyCardContents(firstCard, dummyTask);
    expect(document.title).toBe('ToDo: 0 tasks incomplete');

    await mockFetchHelper({ ...dummyTask, _id: firstID, complete: false });
    const firstCheckbox = firstCard.find('input');
    await act(async () => {
      await firstCheckbox.simulate('change', falseClickEvent);
      await app.update();
    });
    expect(document.title).toBe('ToDo: 1 task incomplete');

    await mockFetchHelper({ ...dummyTask, _id: firstID, complete: true });
    await act(async () => {
      await firstCheckbox.simulate('change', trueClickEvent);
      await app.update();
    });
    expect(document.title).toBe('ToDo: 0 tasks incomplete');

    await returnToHomePage(app);
  });

  test('can go through through a second form submission and see the first and second tasks on the tasks page', async () => {
    await act(async () => {
      await fillOutForm(app, secondDummy);
      await mockFetchHelper(
        { ...secondDummy, _id: secondID },
        true,
        Promise.resolve({
          json: () =>
            Promise.resolve({
              results: [
                { ...dummyTask, _id: firstID },
                { ...secondDummy, _id: secondID },
              ],
            }),
        })
      );

      await submitAndChangePage(app);
      await app.update();

      expect(app.find('.card-header').at(0).text()).toBe('Task 1');
      expect(app.find('.card-header').at(1).text()).toBe('Task 2');

      const firstCard = app.find('.card-body-group').at(0);
      const secondCard = app.find('.card-body-group').at(1);
      await verifyCardContents(secondCard, secondDummy);
      expect(document.title).toBe('ToDo: 1 task incomplete');

      await mockFetchHelper({ ...dummyTask, _id: firstID, complete: false });
      const firstCheckbox = firstCard.find('input').at(0);
      await firstCheckbox.simulate('change', falseClickEvent);
      await app.update();
      expect(document.title).toBe('ToDo: 2 tasks incomplete');

      await mockFetchHelper({ ...secondDummy, _id: secondID, complete: true });
      const secondCheckbox = secondCard.find('input').at(0);
      await secondCheckbox.simulate('change', trueClickEvent);
      await app.update();

      await mockFetchHelper({ ...dummyTask, _id: firstID, complete: true });
      await firstCheckbox.simulate('change', trueClickEvent);
      await app.update();

      expect(document.title).toBe('ToDo: 0 tasks incomplete');
    });
  });

  test('can delete multiple items', async () => {
    const firstCard = app.find('.card-body-group').at(0);
    expect(app.find('.card-body-group')).toHaveLength(2);

    const firstDeleteContainer = firstCard.find('.card-body').at(1);

    await mockFetchHelper({ ...dummyTask, _id: firstID });
    const firstDeleteButton = firstDeleteContainer.find('button');
    await firstDeleteButton.simulate('click');
    await act(async () => await app.update());
    expect(app.find('.card-body-group')).toHaveLength(1);

    await mockFetchHelper({ ...secondDummy, _id: secondID });
    const lastCard = app.find('.card-body-group').at(0);
    const lastDeleteContainer = lastCard.find('.card-body').at(1);
    const lastDeleteButton = lastDeleteContainer.find('button');
    lastDeleteButton.simulate('click');
    await act(async () => await app.update());

    const mainContent = app.find('#main-content');
    expect(mainContent.text().includes('No tasks to show!')).toBeTruthy();

    await returnToHomePage(app);
  });

  test('can show pagination', async () => {
    await fillOutForm(app, dummyTask);
    await mockFetchHelper(
      { ...dummyTask, _id: firstID },
      true,
      Promise.resolve({
        json: () =>
          Promise.resolve({ results: [{ ...dummyTask, _id: firstID }] }),
      })
    );

    await act(async () => {
      await submitAndChangePage(app);
      await returnToHomePage(app);
      await app.update();
    });

    await mockFetchHelper(
      { ...secondDummy, _id: secondID },
      true,
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              { ...dummyTask, _id: firstID },
              { ...secondDummy, _id: secondID },
            ],
          }),
      })
    );
    await fillOutForm(app, secondDummy);
    await act(async () => {
      await submitAndChangePage(app);
      await returnToHomePage(app);
      await app.update();
    });

    await mockFetchHelper(
      { ...thirdDummy, _id: thirdID },
      true,
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              { ...dummyTask, _id: firstID },
              { ...secondDummy, _id: secondID },
              { ...thirdDummy, _id: thirdID },
            ],
          }),
      })
    );
    await fillOutForm(app, thirdDummy);
    await act(async () => {
      await submitAndChangePage(app);
      await app.update();
    });

    expect(app.find('.card-header').at(0).text()).toBe('Task 1');
    expect(app.find('.card-header').at(1).text()).toBe('Task 2');
    expect(app.find('.card-header').at(2).text()).toBe('Task 3');

    const settings = app.find('#settings');
    const taskCount = settings.find('.task-count').at(0);
    const taskText = taskCount.find('input');
    expect(taskText.getDOMNode().value).toBe('3');

    const minusBtn = taskCount.find('.minus-btn').at(0);
    await minusBtn.simulate('click');
    expect(taskText.getDOMNode().value).toBe('2');

    expect(app.find('.card-header')).toHaveLength(2);
    expect(app.find('.card-header').at(0).text()).toBe('Task 1');
    expect(app.find('.card-header').at(1).text()).toBe('Task 2');

    await minusBtn.simulate('click');
    expect(app.find('.card-header')).toHaveLength(1);
    expect(app.find('.card-header').at(0).text()).toBe('Task 1');

    const plusBtn = taskCount.find('.plus-btn').at(0);
    await plusBtn.simulate('click');
    await plusBtn.simulate('click');
    expect(app.find('.card-header')).toHaveLength(3);

    const checkboxContainer = settings.find('#complete-toggle').at(0);
    const checkbox = checkboxContainer.find('input');

    await checkbox.simulate('change', falseClickEvent);
    checkbox.getDOMNode().checked = false;
    expect(app.find('.card-header')).toHaveLength(2);

    await checkbox.simulate('change', trueClickEvent);
    expect(app.find('.card-header')).toHaveLength(3);

    await minusBtn.simulate('click');

    const paginationUl = settings.find('.pagination');
    const firstPage = paginationUl.find('a').at(0);
    const lastPage = paginationUl.find('a').at(1);

    await lastPage.simulate('click');
    expect(app.find('.card-header')).toHaveLength(1);
    expect(app.find('.card-header').at(0).text()).toBe('Task 3');

    await firstPage.simulate('click');
    expect(app.find('.card-header')).toHaveLength(2);
    expect(app.find('.card-header').at(0).text()).toBe('Task 1');
    expect(app.find('.card-header').at(1).text()).toBe('Task 2');
  });
});
