import React from 'react'
import video from '../../assets/videos/home video place holder.mp4'
const VideoSection = () => {
  return (
    <div className='' >
      <div className="container-mx flex-center py-[3rem] lg:py-[6rem]">
        <video src={video} width="70%" controls>
        </video>
      </div>
    </div>
  )
}

export default VideoSection