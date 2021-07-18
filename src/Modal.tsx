import "./styles/Modal.sass";
import { FC, useState } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import React from 'react';
import { IPostResponse, IVisible } from "./interfaces";

const Modal: FC<IVisible> = ({ isVisible, setIsVisible }: IVisible) => {
  const [id, setId] = useState('');
  const [hash, setHash] = useState('');

  const link = "http://localhost:3001/buildsPost/";
  
  const handleSubmit = () => {
    setIsVisible(false);
    axios.get(link + hash).then((res: IPostResponse) => {
      console.log(res.data);
      setId(res.data.id);
      window.location.reload()
    });
  };

  return (
    <div
      className="modal-wrapper"
      style={isVisible ? {} : { display: "none" }}
      onClick={() => setIsVisible(false)}
    >

      {id ? (<Redirect push to={'/build/' + id} />) : null}

      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>New build</h3>
        <label htmlFor="hash">
          Enter the commit hash which you want to build.
        </label>
        <input
          className="input"
          placeholder="Commit hash"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          type="search"
          name="hash"
          id="hash"
        />
        <div className="buttons">
          <input
            type="submit"
            className="button button_gold"
            value="Run build"
            onClick={handleSubmit}
          />
          <input
            type="submit"
            onClick={() => {
              setIsVisible(false);
              setHash("");
            }}
            className="button button_gray"
            value="Cancel"
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
