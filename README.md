# Lab 28 — Context API

## ToDo application with remote API, custom hooks, and context

Labs 26, 27, and 28 for CF JS 401 Nights

### Author: Earl Jay Caoile

### Links and Resources

#### Submission Reqs

- [submission PR](https://github.com/earljay-caoile-401-advanced-javascript/hooks-todo/pull/4)
- [GitHub actions](https://github.com/earljay-caoile-401-advanced-javascript/hooks-todo/actions)
- [code sandbox](https://codesandbox.io/s/github/earljay-caoile-401-advanced-javascript/hooks-todo/tree/lab-28)
- [Netlify Deployment](https://elastic-hopper-626eb2.netlify.app/)

#### Resources

- [HTML Color Picker](https://www.w3schools.com/colors/colors_picker.asp)
- [CSS Layout - Horizontal & Vertical Align](https://www.w3schools.com/csS/css_align.asp)
- [React Bootstrap Navbars](https://react-bootstrap.github.io/components/navbar/)
- [Can I change the checkbox size using CSS?](https://stackoverflow.com/questions/306924/can-i-change-the-checkbox-size-using-css)
- [[ESLint] Feedback for 'exhaustive-deps' lint rule](https://github.com/facebook/react/issues/14920)
- [Viewport vs Percentage Units](https://bitsofco.de/viewport-vs-percentage-units/)
- [How to call an API every minute for a Dashboard in REACT](https://stackoverflow.com/questions/48601813/how-to-call-an-api-every-minute-for-a-dashboard-in-react)
- [Font Awesome Spinner Icons](https://www.w3schools.com/icons/fontawesome_icons_spinner.asp)
- [Using CSS for a fade-in effect on page load](https://stackoverflow.com/questions/11679567/using-css-for-a-fade-in-effect-on-page-load)
- [how to CSS shake image](https://www.w3schools.com/howto/howto_css_shake_image.asp)
- [Flexbox Centering Guide](https://onextrapixel.com/flexbox-centering-guide/)
- [react-bootstrap how to collapse menu when item is selected](https://stackoverflow.com/questions/32452695/react-bootstrap-how-to-collapse-menu-when-item-is-selected)

### Documentation

- [React JS Hello World](https://reactjs.org/docs/hello-world.html)
- [SASS](https://sass-lang.com/)
- [Enzyme (Set State)](https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/setState.html)
- [React Font Awesome](https://github.com/FortAwesome/react-fontawesome)
- [JSON Stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- [Boostrap Responsive Breakpoints](https://getbootstrap.com/docs/4.1/layout/overview/#responsive-breakpoints)

### Setup

- install node packages locally with `npm i` from the root directory in Terminal
- start the server with `npm start`

### Using the App

- fill out form on the home page
- click the submit button
- click the checkbox on tasks page showing your new ToDo task repeatedly to toggle the title
- repeat the above 3 steps to generate a second task
- change the number of tasks per page in the top right textbox to create pagination (either clicking the - or + buttons or typing in a number and hitting enter)
- with the tasks per page set to a number below the number of tasks, click the prev, next, or number buttons to explore the different "pages"
- delete as many items as you'd like
- smile

### UML

![UML Image](lab-28-uml.png)
