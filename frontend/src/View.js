import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./UIelement/LoadingSpinner";
import "./Deploy.css";

import { server } from "./util/server";
import RFB from "@novnc/novnc/";

const Deploy = () => {
  const [URL, setURL] = useState(null);
  const [vncpassword, setVncpassword] = useState(null);
  const [repository, setRepository] = useState(null);

  const [RFBobj, setRFBobj] = useState(null);

  const screen = useRef(null);

  const uid = useParams().uid;

  const getConnectionURL = async() => {
    try {
        const response = await fetch(`${server}/view/${uid}`, {
          method: "GET",
        });
  
        const data = await response.json();
        console.log(data.url);
  
        setURL(data.url);
        setVncpassword(data.vncpassword);
        setRepository(data.repository);
      } catch {
        alert("Something went wrong!");
      }
  }

  useEffect(() => {
    getConnectionURL()
  }, []);

  useEffect(() => {
    if (!!URL && !!vncpassword) {
      initiateConnection();
    }


  }, [URL, vncpassword]);

  const initiateConnection = () => {
    console.log(URL);
    console.log(vncpassword);
    let rfb = new RFB(screen.current, URL, {
      credentials: { password: vncpassword },
    });

    setRFBobj(rfb);

    rfb.viewOnly = false;
    rfb.scaleViewport = false;
  };

  return (
    <main className="Deploy">
      <div className="details"></div>
      {!!URL && !!vncpassword ? (
        <>
          <div className="status">
            <h3 className="text-center">
              Currently viewing deployment of
              <a href={repository} className="ml-5">
                <span>{repository}</span>.
              </a>
            </h3>
          </div>

          <div className="renderArea" ref={screen}></div>
        </>
      ) : (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
    </main>
  );
};

export default Deploy;
