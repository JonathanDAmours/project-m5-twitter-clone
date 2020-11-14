import React from "react";
import styled from "styled-components";
import { FiRepeat } from "react-icons/fi";
import moment from "moment";
import ActionBar from "./ActionBar";
import { useHistory } from "react-router-dom";
import LoaderCircle from "./LoaderCircle";

const Tweet = (props) => {
  const { tweet, numLikes, tweetLiked } = props;

  const tweetId = tweet.id;
  let history = useHistory();

  const handleDetails = (e) => {
    e.stopPropagation();
    history.push(`/tweet/${tweetId}`);
  };

  const handleProfile = (e) => {
    e.stopPropagation();
    history.push(`/${tweet.author.handle}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      handleDetails(e);
    }
  };

  const handleKeyDownProfile = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      handleProfile(e);
    }
  };

  const mediaImg = tweet.media.map((media) => {
    return media.url;
  });

  console.log(tweet.numLikes);

  return (
    <>
      {!tweet ? (
        <LoaderCircle />
      ) : (
        <Wrapper
          aria-label="See tweet"
          tabIndex="0"
          onKeyDown={handleKeyDown}
          onClick={handleDetails}
        >
          <TweetSection>
            <Icon>
              {tweet.retweetFrom && <StyledFiRepeat />}
              <TweetAvatar onClick={handleProfile}>
                <Avatar src={tweet.author.avatarSrc} />
              </TweetAvatar>
            </Icon>
            <TweetInfo>
              {tweet.retweetFrom && (
                <HandleRetweet>
                  {tweet.retweetFrom.displayName} Remeowed
                </HandleRetweet>
              )}
              <MainInfo>
                <Name
                  aria-label="Go to author page"
                  tabIndex="0"
                  onKeyDown={handleKeyDownProfile}
                  onClick={handleProfile}
                >
                  {tweet.author.displayName}
                </Name>
                <Handle>@{tweet.author.handle}</Handle>
                <TimeStamp>
                  {moment(tweet.timestamp).format("MMM Do")}
                </TimeStamp>
              </MainInfo>
              <Div>
                <TweetStatus>{tweet.status}</TweetStatus>
                <TweetMedia src={mediaImg} />
              </Div>
              <ActionBar
                tweetLiked={tweetLiked}
                tweetId={tweet.id}
                numLikes={numLikes}
              />
            </TweetInfo>
          </TweetSection>
        </Wrapper>
      )}
    </>
  );
};

const Div = styled.div``;

const Wrapper = styled.div`
  border-bottom: 1px solid #f0f0f0;
  padding-right: 20px;
  padding-top: 20px;
  max-width: 70vw;
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StyledFiRepeat = styled(FiRepeat)`
  margin-right: 25px;
  margin-bottom: 15px;
  color: #808080;
`;

const HandleRetweet = styled.p`
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 600;
  color: #808080;
`;

const TweetSection = styled.div`
  display: flex;
`;

const TweetAvatar = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const TweetInfo = styled.div`
  width: 100%;
`;

const MainInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-top: 5px;
`;

const Name = styled.h1`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const Handle = styled.p`
  margin-left: 10px;
  font-size: 18px;
  font-weight: 500;
  color: #404040;
`;

const TimeStamp = styled.p`
  margin-left: 20px;
  font-size: 18px;
  color: #404040;
`;

const TweetStatus = styled.p`
  width: 100%;
  font-size: 20px;
  line-height: 1.3em;
`;

const TweetMedia = styled.img`
  width: 100%;
  border-radius: 25px;
  margin-top: 20px;
`;

export default Tweet;
