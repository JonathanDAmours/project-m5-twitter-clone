import React, { useState, useEffect } from "react";
import Tweet from "./Tweet";
import styled from "styled-components";
import InputTweet from "./InputTweet";
import LoaderCircle from "./LoaderCircle";
import ErrorPage from "./ErrorPage";

const HomeFeed = () => {
  const [currentFeed, setCurrentFeed] = useState([]);
  const [newTweet, setNewTweet] = useState(0);
  const [homeStatus, setHomeStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch(`/api/me/home-feed`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          const tweets = Object.values(data.tweetsById);
          const sortedTweets = tweets.sort((a, b) =>
            a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
          );
          setHomeStatus("idle");
          setCurrentFeed(sortedTweets);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg("error");
      });
  }, [newTweet]);

  return (
    <>
      {errorMsg === "error" ? (
        <ErrorPage />
      ) : (
        <>
          {homeStatus === "loading" ? (
            <LoaderCircle />
          ) : (
            <>
              <HomeSection>
                <Span>Home</Span>
              </HomeSection>
              <InputTweet newTweet={newTweet} setNewTweet={setNewTweet} />
              <Divider />
              <>
                {!currentFeed ? (
                  <LoaderCircle />
                ) : (
                  <div>
                    {currentFeed.map((tweet) => {
                      return (
                        <Tweet
                          tweetLiked={tweet.isLiked}
                          numLikes={tweet.numLikes}
                          tweet={tweet}
                          key={tweet.id}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            </>
          )}
        </>
      )}
    </>
  );
};

const Divider = styled.div`
  width: 100%;
  height: 7px;
  background-color: #eaeaee;
`;

const HomeSection = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;
`;

const Span = styled.span`
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 0 15px;
`;

export default HomeFeed;
