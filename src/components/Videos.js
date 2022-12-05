import { Link } from "react-router-dom";
import Video from "./Video";
import useVideoList from "../hooks/useVideoList";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, videos, error, hashMore } = useVideoList(page);

  return (
    <div>
      <InfiniteScroll
        dataLength={videos.length}
        hasMore={hashMore}
        loader="Loading..."
        next={() => setPage(page + 6)}
      >
        {videos.length > 0 &&
          videos.map((video, { youtubeID, title, noq }) =>
            video.noq > 0 ? (
              <Link to={`/quiz/${video.youtubeID}`}>
                <Video
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                  key={video.youtubeID}
                />
              </Link>
            ) : (
              <Video
                title={video.title}
                id={video.youtubeID}
                noq={video.noq}
                key={video.youtubeID}
              />
            )
          )}
      </InfiniteScroll>

      {!loading && videos.length === 0 && <div>Data not found!</div>}
      {error && <div>There was an error! </div>}
      {loading && <div>Loading...</div>}
    </div>
  );
}
