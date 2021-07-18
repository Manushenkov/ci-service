import SettingsButton from "./SettingsButton";
import "./styles/Header.sass";
import React, { FC } from "react";
import { IHeader } from './interfaces'

const Header: FC<IHeader> = ({ title, buttons }: IHeader) =>
  <header className="App__header">
    <div className="container">
      <h1>{title}</h1>
      <div className="header__buttons">
        {buttons && buttons.map(({ text, src, href, cb }, index) => (
          <SettingsButton key={index} text={text} src={src} href={href} cb={cb} />
        ))}
      </div>
    </div>
  </header>


export default Header;
