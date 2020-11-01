import React, { useState } from 'react';
import Navigator from './Navigator';
import Task1Main from './Task1/Task1Main';

export enum Content {
  Main,
  Task1,
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

  return (
    <Navigator 
      changeContent={changeContent}
    />
  )
}

export default App;
