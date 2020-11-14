import React, { useEffect, useState, createContext, useContext } from "react";
import ErrorPage from "./ErrorPage";
import LoaderCircle from "./LoaderCircle";

export const CurrentUserContext = createContext(null);
export const UseCurrentUser = () => useContext(CurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [status, setStatus] = useState("loading");

  // Fetch data
  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          setCurrentProfile(data.profile);
          setCurrentUser(data.profile.handle);
          setStatus("idle");
        }
      })
      .catch((error) => {
        setStatus("error");
        console.log(error);
      });
  }, []);

  return (
    <>
      {status === "error" ? (
        <ErrorPage />
      ) : (
        <>
          {status === "loading" ? (
            <LoaderCircle />
          ) : (
            <CurrentUserContext.Provider
              value={{ currentProfile, currentUser, status }}
            >
              {children}
            </CurrentUserContext.Provider>
          )}
        </>
      )}
    </>
  );
};
