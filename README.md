# React Burger Builder

This Burger Builder React app is the main project from [this Academind Course](https://pro.academind.com/courses/enrolled/768614). It provides authentication, burger building/ordering 😁 functionality and order history.

---

## Demo

Working live demo: https://react-my-burger-ecd86.firebaseapp.com/

---

## General Info

- Built with `create-react-app`
- Uses Redux for state management
  - _master_ branch uses `redux-thunk` for async logic that interacts with the store
  - _saga_ branch uses `redux-saga` for that
- _redux_ branch contains class-based components
  - _hooks_ branch contains the conversion of the whole project to only use functional components and react hooks (eventually merged into master)
- Firbase used for storage and authentication

---

## Technologies & Concepts

- React
- Redux, redux-thunk and redux-saga
- Axios
- routing, HOCs, react hooks
- CSS modules
