import React, { FC } from 'react';
import { ISettingsButton } from './interfaces';

const SettingsButton: FC<ISettingsButton> = ({ text, src, href, cb }: ISettingsButton) =>
  <a href={href} className="header__button" onClick={cb}>
    <img src={src} alt="" />
    {text && (<p>{text}</p>)}
  </a>

export default SettingsButton;