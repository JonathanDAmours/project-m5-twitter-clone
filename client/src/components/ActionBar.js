import React, { useState } from "react";
import styled from "styled-components";
import { FiMessageCircle, FiRepeat, FiHeart, FiUpload } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import ErrorPage from "./ErrorPage";

const ActionBar = (props) => {
  const { tweetId, numLikes, tweetLiked } = props;
  const [errorMsg, setErrorMsg] = useState("success");

  const [isLiked, setIsLiked] = useState(tweetLiked);
  const [numOfLikes, setNumOfLikes] = useState(numLikes);
  const handleToggleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      setNumOfLikes(numOfLikes - 1);
      setIsLiked(false);
    } else {
      setNumOfLikes(numOfLikes + 1);
      setIsLiked(true);
    }
    fetch(`/api/tweet/${tweetId}/like`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ like: !isLiked }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg("error");
      });
  };
  return (
    <>
      {errorMsg === "error" ? (
        <ErrorPage />
      ) : (
        <Wrapper>
          <Div>
            <StyledFiMessageCircle tabIndex="0" />
          </Div>
          <Div>
            <StyledFiRepeat tabIndex="0" />
          </Div>
          <Div>
            {!isLiked && (
              <StyledFiHeart
                aria-label="Like tweet"
                onClick={(e, tweetId) => {
                  handleToggleLike(e, tweetId);
                }}
                tabIndex="0"
              />
            )}
            {isLiked && (
              <RedFaHeart
                aria-label="UnLike tweet"
                onClick={(e, tweetId) => {
                  handleToggleLike(e, tweetId);
                }}
                tabIndex="0"
              />
            )}
            {!isLiked && <SpanInvisible>00</SpanInvisible>}
            {isLiked && <Span>{numOfLikes}</Span>}
          </Div>

          <Div>
            <StyledFiUpload tabIndex="0" />
          </Div>
        </Wrapper>
      )}
    </>
  );
};

const SpanInvisible = styled.span`
  color: transparent;
`;

const Span = styled.span`
  color: black;
  margin-left: 5px;
`;

const StyledFiMessageCircle = styled(FiMessageCircle)`
  width: 30px;
  height: 30px;
  padding: 5px;
  &:hover {
    color: #1da1f2;
    background: #d6f0ff;
    border-radius: 20px;
    cursor: pointer;
  }
`;
const StyledFiRepeat = styled(FiRepeat)`
  width: 30px;
  height: 30px;
  padding: 5px;
  &:hover {
    color: #008080;
    background: #ebffff;
    border-radius: 20px;
    cursor: pointer;
  }
`;

const RedFaHeart = styled(FaHeart)`
  width: 30px;
  height: 30px;
  padding: 5px;
  color: #ff3855;
  &:hover {
    background: #ffccd3;
    border-radius: 20px;
  }
`;

const StyledFiHeart = styled(FiHeart)`
  width: 30px;
  height: 30px;
  padding: 5px;
  &:hover {
    color: #ff3855;
    background: #ffccd3;
    border-radius: 20px;
  }
`;
const StyledFiUpload = styled(FiUpload)`
  width: 30px;
  height: 30px;
  padding: 5px;
  &:hover {
    color: #00aaee;
    background: #d9f4ff;
    border-radius: 20px;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 48px;
`;

export default ActionBar;
