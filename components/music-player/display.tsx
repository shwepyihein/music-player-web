import { useEffect } from 'react';

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}: any) => {
  useEffect(() => {
    setTimeout(() => {
      const seconds = audioRef.current.duration;
      setDuration(seconds);
      progressBarRef.current.max = seconds;
    }, 1000);
  }, []);

  return (
    <div>
      <audio src={currentTrack} ref={audioRef} />
      <div className="audio-info">
        <div className="audio-image">
          {/* {currentTrack.thumbnail ? (
            <img src={currentTrack.thumbnail} alt="audio avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )} */}
        </div>
        <div className="text">
          {/* <p className="title">{currentTrack.title}</p>
          <p>{currentTrack.author}</p> */}
        </div>
      </div>
    </div>
  );
};
export default DisplayTrack;
