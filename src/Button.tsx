import "./styles/Button.sass";
import React, {FC} from 'react';
import { IButton } from "./interfaces";

const Button:FC<IButton> = ({ text, href, className, onClick }: IButton) =>
  <a href={href} className={className} onClick={onClick}>
    <p>{text}</p>
  </a>

export default Button;
