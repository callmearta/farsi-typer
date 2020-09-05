import React, { useState } from 'react';
import './App.scss';

import Editor from './components/editor';
import Speech from './components/speech';

function App() {
  const [text, setText] = useState('');

  return (
    <div className="App">
      <h1>جانا، سخن از زبانت بگو من بنویسم برات...</h1>
      <Speech text={text} setText={setText} />
      <Editor text={text} setText={setText} />
    </div>
  );
}

export default App;
