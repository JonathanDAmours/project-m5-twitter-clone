import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import ActionBar from "./ActionBar";
import { useParams, useHistory } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import LoaderCircle from "./LoaderCircle";
import ErrorPage from "./ErrorPage";

const TweetDetails = () => {
  const { tweetId } = useParams();
  const [currentTweet, setCurrentTweet] = useState(null);
  const [tweetStatus, setTweetStatus] = useState("loading");
  const [numLikes, setNumLikes] = useState(null);
  const [tweetLiked, setTweetLiked] = useState(null);
  const [errorMsg, setErrorMsg] = useState("success");

  let history = useHistory();

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          setCurrentTweet(data?.tweet);
          setTweetStatus("idle");
          setNumLikes(data?.tweet?.numLikes);
          setTweetLiked(data?.tweet?.isLiked);
          console.log(data.tweet.isLiked);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg("error");
      });
  }, [tweetId]);

  function goBack() {
    window.history.back();
  }

  const mediaImg = currentTweet?.media?.map((media) => {
    return media.url;
  });

  const handleProfile = (e) => {
    e.stopPropagation();
    history.push(`/${currentTweet.author.handle}`);
  };

  const handleBack = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      goBack();
    }
  };

  const handleP = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      handleProfile(e);
    }
  };

  return (
    <>
      {errorMsg === "error" ? (
        <ErrorPage />
      ) : (
        <>
          {tweetStatus === "loading" ? (
            <LoaderCircle />
          ) : (
            <>
              <BackSection
                aria-label="Go to previous page"
                onKeyDown={handleBack}
                tabIndex="0"
                onClick={goBack}
              >
                <StyledBiLeftArrowAlt />
                <Span>Meow</Span>
              </BackSection>
              <Wrapper>
                <UserSection>
                  <Avatar
                    onClick={handleProfile}
                    src={currentTweet?.author?.avatarSrc}
                  />
                  <NameSection>
                    <Name
                      aria-label="Go to author page"
                      onKeyDown={handleP}
                      tabIndex="0"
                      onClick={handleProfile}
                    >
                      {currentTweet?.author?.displayName}
                    </Name>
                    <Handle>@{currentTweet?.author?.handle}</Handle>
                  </NameSection>
                </UserSection>
                <Status>{currentTweet?.status}</Status>
                <TweetMedia src={mediaImg} />
                <DateSection>
                  <TimeStamp>
                    {moment(currentTweet?.timestamp).format("hh:mm A")} •{" "}
                    {moment(currentTweet?.timestamp).format("MMM Do YYYY")}
                  </TimeStamp>
                  <WebApp>- Critter web app</WebApp>
                </DateSection>
                <Div>
                  <ActionBar
                    tweetId={tweetId}
                    tweetLiked={currentTweet.isLiked}
                    numLikes={currentTweet.numLikes}
                  />
                </Div>
              </Wrapper>
            </>
          )}
        </>
      )}
    </>
  );
};

const Div = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 20px 0 20px;
`;
const TweetMedia = styled.img`
  width: 100%;
  border-radius: 25px;
  margin-top: 10px;
`;

const BackSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;
  cursor: pointer;
`;

const StyledBiLeftArrowAlt = styled(BiLeftArrowAlt)`
  width: 1.5em;
  height: 1.5em;
`;

const Span = styled.span`
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 0 15px;
`;

const UserSection = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 0 0 0;
  align-items: center;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const NameSection = styled.div`
  margin-left: 10px;
`;

const Name = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2px;
  cursor: pointer;
`;

const Handle = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #404040;
`;

const Status = styled.p`
  width: 58vw;
  height: 75px;
  padding: 30px 0 0 0;
  font-size: 22px;
`;

const DateSection = styled.div`
  display: flex;
  align-items: center;
  margin: 60px 0 10px 0;
  font-size: 18px;
  color: #404040;
`;

const TimeStamp = styled.p`
  font-size: 14px;
`;

const WebApp = styled.span`
  margin-left: 5px;
  font-size: 14px;
`;

export default TweetDetails;
