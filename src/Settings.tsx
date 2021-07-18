import { FC, useState } from "react";
import "./styles/Settings.sass";
import axios from "axios";
import { useHistory } from "react-router-dom";
import React from 'react';
import Header from "./Header";

const Settings: FC = () => {
  const [repo, setRepo] = useState<string>("");
  const [build, setBuild] = useState<string>("");
  const [branch, setBranch] = useState<string>("");
  const [time, setTime] = useState<string>('');
  const [isLocked, setIsLocked] = useState<true | false>(false);

  const history = useHistory();

  const redirect = () => {
    history.push("/");
  };

  const link = "http://localhost:3001/settingsPost";

  const handleSubmit = () => {
    if (
      //validation
      (isNaN(parseFloat(time)) && isNaN(+time - 0)) ||
      !time ||
      !build ||
      !repo
    ) {
      alert("poor input");
    } else {
      setIsLocked(true);
      axios
        .get(
          link,
          {
            params: {
              repoName: repo,
              buildCommand: build,
              mainBranch: branch,
              period: time,
            },
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(() => {
          setIsLocked(false);
        })
        .catch((res) => {
          setIsLocked(false);
          alert(res);
        });
    }
  };

  return (
    <>
      <Header title={"School CI server"} />
      <main className="App__Settings">
        <div className="container">
          <h2>Settings</h2>
          <p>Configure repository connection and synchronization settings.</p>
          <form>
            <label htmlFor="rep">
              GitHub repository {!repo && <span style={{ color: "red" }}>*</span>}
            </label>
            <input
              className="input"
              placeholder="user-name/repo-name"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              type="search"
              name="rep"
              id="rep"
            />

            <label htmlFor="build">
              Build command {!build && <span style={{ color: "red" }}>*</span>}
            </label>
            <input
              className="input"
              placeholder="build command"
              value={build}
              onChange={(e) => setBuild(e.target.value)}
              type="search"
              name="build"
              id="build"
            />

            <label htmlFor="branch">Main branch</label>
            <input
              className="input"
              placeholder="Branch name"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              type="search"
              name="branch"
              id="branch"
            />

            <div className="settings__time">
              <label htmlFor="time">Synchronize every</label>
              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                type="text"
                name="time"
                id="time"
              />
              <p>
                minutes
                {((isNaN(parseFloat(time)) && isNaN(+time - 0)) || !time) && (
                  <span style={{ color: "red" }}>*</span>
                )}
              </p>
            </div>
            {isLocked ? (
              <div className="buttons">
                <input
                  type="submit"
                  className="button button_gray"
                  value="Save"
                />
                <input
                  type="submit"
                  className="button button_gray"
                  value="Cancel"
                />
              </div>
            ) : (
              <div className="buttons">
                <input
                  type="submit"
                  onClick={handleSubmit}
                  className="button button_gold"
                  value="Save"
                />
                <input
                  type="submit"
                  onClick={redirect}
                  className="button button_gray"
                  value="Cancel"
                />
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
}

export default Settings;
