import React, { Component, useEffect  } from 'react'

const MyLeaderBoardAd = ({slot}) => {

    useEffect(() => {
         (window.adsbygoogle = window.adsbygoogle || []).push({})
    },[])

    return(
        <ins className="adsbygoogle"
        style={{ display: 'block' }}
     data-ad-client="ca-pub-5802336295097980"
     data-ad-slot={slot}
     data-ad-format="auto"
     data-full-width-responsive="true"
     ></ins>

    )
}

export default MyLeaderBoardAd