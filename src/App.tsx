import React, { useState } from 'react';
import Navigator from './Navigator';
import Task1Main from './Task1/Task1Main';
import Task2Main from './Task2/Task2Main';

export enum Content {
  Main,
  Task1,
  Task2,
}

const App = () => {
  const [contentOnScreen, setContentOnScreen] = useState(Content.Main);

  const changeContent = (content: Content) => {
    setContentOnScreen(content);
  };
  
  
  if (contentOnScreen === Content.Task1) {
    return (
      <Task1Main />
    )
  }

  if (contentOnScreen === Content.Task2) {
    return (
      <Task2Main />
    )
  }

  return (
    <Navigator 
      changeContent={changeContent}
    />
  )
}

export default App;
