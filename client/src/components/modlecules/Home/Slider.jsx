import React from "react"
import styled, { keyframes } from "styled-components"
import images from "../../../themes/image"

const Slider = () => {
  const srcArr = [
    { src: images.icBanner1 },
    { src: images.icBanner2 },
    { src: images.icBanner3 },
  ]

  return (
    <div className="col c-12">
      <Wrap>
        <Block>
          {srcArr.map((item) => (
            <Img src={item.src} />
          ))}
        </Block>
      </Wrap>
    </div>
  )
}

export default Slider

const slider = keyframes`
0%{margin-left:0;}
32%{margin-left:0;}
33%{margin-left:-1200px;}
65%{margin-left:-1200px;}
66%{margin-left:-2400px;}
99%{margin-left:-2400px;}
`
const Block = styled.div`
  display: flex;
  width: calc(1200px * 3);
  animation-name: ${slider};
  animation-duration: 28s;
  animation-iteration-count: infinite;
`
const Wrap = styled.div`
  overflow: hidden;
`
const Img = styled.img`
  height: 500px;
  width: 1200px !important;
  object-fit: cover;
`
