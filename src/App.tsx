import React from 'react';
import './App.css';
import AppBase from './components/base/appbase/AppBase.tsx';
import RouterHome from './RouterHome.tsx';

function App() {
  return (
       <AppBase>
        <RouterHome/>
       </AppBase>
  );
}

export default App;
