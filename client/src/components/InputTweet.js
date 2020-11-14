import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { UseCurrentUser } from "./CurrentUserContext";
import { COLORS } from "../constants";
import LoaderCircle from "./LoaderCircle";
import ErrorPage from "./ErrorPage";

const InputTweet = (props) => {
  const { newTweet, setNewTweet } = props;
  const { currentProfile } = UseCurrentUser();
  const user = currentProfile;
  const [charCount, setCharCount] = useState(280);
  const [maxedChar, setMaxedChar] = useState(true);
  const [tweetContents, setTweetContents] = useState("");
  const [tweetStatus, setTweetStatus] = useState("loading");
  const [newStatus, setNewStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCharCount = (event) => {
    setCharCount(280 - event.target.value.length);
    setTweetContents(event.target.value);
  };

  useEffect(() => {
    if (charCount < 0 || charCount > 278) {
      setMaxedChar(true);
    } else {
      setMaxedChar(false);
    }
  }, [charCount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTweetStatus("loading");
    setTweetContents("");
    setCharCount(280);
    document.getElementById("input").value = "";
    await fetch("/api/tweet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: `${tweetContents}` }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setNewTweet(newTweet + 1);
          setNewStatus("idle");
          console.log(tweetStatus);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg("error");
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      handleSubmit(e);
    }
  };

  return (
    <>
      {errorMsg === "error" ? (
        <ErrorPage />
      ) : (
        <>
          {newStatus === !"loading" ? (
            <LoaderCircle />
          ) : (
            <Wrapper>
              <Div>
                <Picture>
                  <Avatar src={user?.avatarSrc} />
                </Picture>
              </Div>
              <FormArea onSubmit={handleSubmit}>
                <InputArea
                  aria-label="Write tweet"
                  id="input"
                  placeholder={"What's Happening?"}
                  type="text"
                  onInput={handleCharCount}
                ></InputArea>
                <BottomInfo>
                  {charCount >= 56 && (
                    <CharacterLeft>{charCount}</CharacterLeft>
                  )}
                  {charCount <= 55 && charCount >= 0 && (
                    <CharYellow>{charCount}</CharYellow>
                  )}
                  {charCount < 0 && <CharRed>{charCount}</CharRed>}

                  <SubmitButton
                    aria-label="Post tweet"
                    disabled={maxedChar}
                    onKeyDown={handleKeyDown}
                    tabIndex="0"
                    type="submit"
                  >
                    Meow
                  </SubmitButton>
                </BottomInfo>
              </FormArea>
            </Wrapper>
          )}
        </>
      )}
    </>
  );
};

const Div = styled.div`
  padding-top: 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  height: 180px;
  padding-right: 20px;
  margin-bottom: 10px;
`;

const Picture = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const FormArea = styled.form`
  width: 100%;
`;

const InputArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 20px;
  border: none;
  font-family: sans-serif;
  font-size: 20px;

  &:focus {
    outline: none;
  }
`;

const BottomInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CharacterLeft = styled.p`
  color: #b7b2b2;
`;

const CharRed = styled.p`
  color: red;
`;

const CharYellow = styled.p`
  color: orange;
`;

const SubmitButton = styled.button`
  box-sizing: border-box;
  width: 125px;
  height: 50px;
  font-size: 22px;
  font-weight: bold;
  background: none;
  background-color: ${COLORS.primary};
  border-radius: 25px;
  color: white;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;
  margin-left: 20px;

  &:disabled {
    background-color: #ad91fd;
    cursor: not-allowed;
  }
`;

export default InputTweet;
