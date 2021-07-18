import Button from "./Button";
import logo from './public/logo.svg'
import "./styles/StartScreen.sass";
import React, { FC } from 'react';

const StartScreen: FC = () =>
  <main className="App__start-screen">
    <div className="container">
      <img src={logo} alt="logo" />
      <p className="start-screen__text">Configure repository connection and synchronization settings</p>
      <Button text="Open settings" className="button button_gold" href="/settings" />
    </div>
  </main>

export default StartScreen;
