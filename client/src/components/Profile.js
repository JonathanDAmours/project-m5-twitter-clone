import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GrLocation } from "react-icons/gr";
import { FiCalendar } from "react-icons/fi";
import moment from "moment";
import { COLORS } from "../constants";
import Tweet from "./Tweet";
import LoaderCircle from "./LoaderCircle";
import ErrorPage from "./ErrorPage";

const Profile = () => {
  const { profileId } = useParams();
  const [currentProfile, setCurrentProfile] = useState(null);
  const [profileStatus, setProfileStatus] = useState("loading");

  const [currentTweet, setCurrentTweet] = useState(null);
  const [tweetStatus, setTweetStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("success");

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          setCurrentProfile(data.profile);
          setProfileStatus("idle");
          console.log(tweetStatus);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg("error");
      });
  }, [profileId]);

  useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          const tweets = Object.values(data.tweetsById);
          const sortedTweets = tweets.sort((a, b) =>
            a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
          );
          setCurrentTweet(sortedTweets);
          setTweetStatus("idle");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg("error");
      });
  }, [profileId]);

  console.log(currentTweet);
  return (
    <>
      {errorMsg === "error" ? (
        <ErrorPage />
      ) : (
        <>
          {!currentProfile || profileStatus === "loading" ? (
            <LoaderCircle />
          ) : (
            <Wrapper>
              <PictureDiv>
                <BannerDiv>
                  <Banner src={currentProfile?.bannerSrc} />
                </BannerDiv>
                <Avatar src={currentProfile?.avatarSrc} />
              </PictureDiv>
              <UserSection>
                <User>
                  <DisplayName>{currentProfile?.displayName}</DisplayName>
                  <UserHandle>@{currentProfile?.handle}</UserHandle>
                  <Bio>{currentProfile?.bio}</Bio>
                  <InfoData>
                    <StyledGrLocation />
                    <Span>{currentProfile?.location}</Span>
                    <StyledFiCalendar />
                    <Span>
                      Joined{" "}
                      {moment(currentProfile?.joined).format("MMMM YYYY")}
                    </Span>
                  </InfoData>
                  <FollowStatus>
                    <Following>
                      {currentProfile?.numFollowing} <SpanF>Following</SpanF>
                    </Following>
                    <Followers>
                      {currentProfile?.numFollowers} <SpanF>Followers</SpanF>
                    </Followers>
                  </FollowStatus>
                </User>
                <BtnDiv>
                  <Button aria-label="See user tweet" tabIndex="0" autofocus>
                    Tweets
                  </Button>
                  <Button tabIndex="0">Media</Button>
                  <Button tabIndex="0">Likes</Button>
                </BtnDiv>
              </UserSection>

              {!currentTweet ? (
                <LoaderCircle />
              ) : (
                <>
                  {currentTweet?.map((tweet) => {
                    return (
                      <Tweet
                        tweetLiked={tweet.isLiked}
                        numLikes={tweet.numLikes}
                        tweet={tweet}
                        key={tweet.id}
                      />
                    );
                  })}
                </>
              )}
            </Wrapper>
          )}
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  border-bottom: 1px solid #f0f0f0;
`;

const PictureDiv = styled.div``;

const BannerDiv = styled.div`
  height: 200px;
  overflow: hidden;
`;

const Banner = styled.img`
  width: 100%;
`;

const Avatar = styled.img`
  width: 200px;
  border-radius: 50%;
  border: solid 5px white;
  position: absolute;
  top: 100px;
  margin-left: 30px;
`;

const User = styled.div`
  margin: 0 30px;
`;

const DisplayName = styled.h1`
  font-size: 24px;
  margin-top: 100px;
`;

const UserHandle = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin-top: 5px;
  color: #989898;
`;

const Bio = styled.p`
  font-size: 18px;
  margin-top: 35px;
  color: black;
`;

const InfoData = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
`;

const Span = styled.span`
  color: #989898;
  font-size: 18px;
  font-weight: 600;
  margin-left: 5px;
`;

const StyledGrLocation = styled(GrLocation)`
  width: 1.5em;
  height: 1.5em;
  opacity: 0.5;
`;

const StyledFiCalendar = styled(FiCalendar)`
  width: 1.5em;
  height: 1.5em;
  opacity: 0.5;
  margin-left: 20px;
`;

const FollowStatus = styled.div`
  margin-top: 25px;
`;

const Following = styled.span`
  font-size: 18px;
  color: #404040;
  font-weight: bold;
`;

const Followers = styled.span`
  font-size: 18px;
  color: #404040;
  font-weight: bold;
  margin-left: 30px;
`;

const SpanF = styled.span`
  font-weight: 500;
  color: #707070;
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

const Button = styled.button`
  box-sizing: border-box;
  width: 33.1%;
  height: 50px;
  font-size: 22px;
  font-weight: bold;
  background: none;
  color: #707070;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;
  border-bottom: 3px solid transparent;

  &:hover {
    color: ${COLORS.primary};
    border-bottom: 3px solid ${COLORS.primary};
  }
`;

const UserSection = styled.div``;

export default Profile;
