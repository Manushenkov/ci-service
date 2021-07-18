import StartScreen from "./StartScreen";
import History from "./History";
import Header from "./Header";
import React, { FC } from 'react';

import cog from "./public/cog.svg";
import play from "./public/play.svg";

import { useState, useEffect } from "react";
import "./styles/Settings.sass";
import axios from "axios";
import { ISettings } from "./interfaces";

const Initial: FC = () => {
  const [repoName, setRepoName] = useState<string>('')

  const buttons = [
    [
      {
        src: cog,
        text: "Settings",
        href: "/settings",
      },
    ],
    [
      {
        src: play,
        text: "Run build",
        cb: () => setIsVisible(true),

      },
      {
        src: cog,
        text: "",
        href: "/settings",
      },
    ],
  ];

  const link = "http://localhost:3001/settingsGet";
  const [settings, setSettings] = useState<string | ISettings["data"]>("waiting");
  const [isVisible, setIsVisible] = useState<boolean>(false); // pop-up

  useEffect(() => {
    axios.get(link).then((res: ISettings) => {
      const { data } = res
      setSettings(data);
      setRepoName(data.repoName);
      console.log(data);
    });
  }, [setRepoName]);

  return (
    <>
      {settings === "waiting" ? (
        ""
      ) : settings === "" ? (
        <>
          <Header title={"School CI server"} buttons={buttons[0]} /> <StartScreen />
        </>
      ) : (
        <>
          <Header title={repoName} buttons={buttons[1]} />
          <History isVisible={isVisible} setIsVisible={setIsVisible} />
        </>
      )}
    </>
  );
}

export default Initial;
