import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import FormDialog from './pages/telaInicial';
import SegundaTela from './pages/segundaTela';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={FormDialog} />
        <Route path="/register" component={SegundaTela} />
      </Switch>
    </BrowserRouter>
  );
}