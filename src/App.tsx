import React from 'react';
import Navigator from './Navigator';

enum Content {
  Main
}

const App = () => {
  let contentOnScreen: Content = Content.Main;
  
  if (contentOnScreen === Content.Main) {
    return (
      <Navigator />
    )
  }

  return null;
}

export default App;
