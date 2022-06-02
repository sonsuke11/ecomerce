import _ from "lodash"
import moment from "moment"
import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import useComment from "../../../hooks/useComment"
import useUser from "../../../hooks/useUser"
import images from "../../../themes/image"
import Button from "../../atoms/Button/Button"
import Star from "../EvaluateProduct/Star"

const Comment = ({ data, type, parent, fetchComment }) => {
  const { userData } = useUser()
  const { updateComment, replyComment } = useComment()
  const currentUserId = userData?.auth?._id
  const isLike = data?.likes?.some((item) => item === currentUserId)
  const [showInput, setShowInput] = useState(false)
  const history = useNavigate()
  const nestedComments = data?.replies?.map((item) => (
    <Comment
      key={item._id}
      parent={data}
      data={item}
      type="child"
      fetchComment={fetchComment}
    />
  ))
  const [displayLabel, setDisplayLabel] = useState(true)
  const [valueInput, setValueInput] = useState()
  const ref = useRef(null)

  const handleUpdate = (params) => {
    updateComment(
      params,
      () => {
        fetchComment()
      },
      () => {}
    )
  }
  const handleLikeClick = () => {
    if (_.isEmpty(userData?.auth)) {
      history("/login")
    } else {
      const newLikes = () => {
        if (isLike) {
          return data?.likes?.filter((like) => like !== currentUserId)
        }
        return [...data?.likes, currentUserId]
      }

      const params = { _id: data._id, likes: newLikes() }
      handleUpdate(params)
    }
  }

  const rank = () => {
    const arrayStar = [...Array(5).fill(false)].map((i, index) => {
      if (index + 1 <= data?.vote) {
        return true
      }
      return i
    })
    return (
      <BlockStar>
        {arrayStar.map((vote) => (
          <StyledStar fill={vote} />
        ))}
      </BlockStar>
    )
  }
  const handleReply = () => {
    let params = {}
    if (type === "child") {
      params = { id: parent._id, content: valueInput, product: data?.product }
    } else {
      params = {
        id: data._id,
        content: valueInput,
        product: data?.product,
      }
    }
    replyComment(
      params,
      () => {
        fetchComment()
        setShowInput(false)
      },
      () => {}
    )
  }

  return (
    <div>
      <Block style={{ ...(type === "child" && { marginLeft: 30 }) }}>
        <Image
          style={{
            backgroundImage: `url(data:image/png;base64,${data?.author?.avatar})`,
          }}
        />
        <Content>
          <p style={{ marginBottom: 5 }}>{data?.author?.username}</p>
          {data?.rootComment && rank()}
          <Time>{moment(data?.createdAt).format("YYYY/MM/DD hh:mm")}</Time>
          <p>{data?.content}</p>
          <ButtonGroup>
            <Like
              src={isLike ? images.icLikeFill : images.icLikeRouned}
              onClick={() => handleLikeClick()}
            />
            {data?.likes?.length > 0 && (
              <p style={{ marginLeft: "0.5rem", fontSize: "1.3rem" }}>
                {data?.likes?.length}
              </p>
            )}
            <Reply
              onClick={() => {
                if (_.isEmpty(userData?.auth)) {
                  history("/login")
                } else {
                  setShowInput(!showInput)
                }
              }}
            >
              Phản hồi
            </Reply>
          </ButtonGroup>
          {showInput && (
            <ReplyWrap>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  style={{
                    backgroundImage: `url(data:image/png;base64,${userData?.auth?.avatar})`,
                    width: "3rem",
                    height: "3rem",
                  }}
                />
                <Input
                  ref={ref}
                  contentEditable
                  onBlur={(e) => {
                    setValueInput(e.target.innerHTML)
                  }}
                  onInput={(e) => {
                    if (e.target.innerHTML) {
                      setDisplayLabel(false)
                    } else {
                      setDisplayLabel(true)
                    }
                  }}
                  theme={{ displayLabel }}
                ></Input>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  marginTop: 10,
                }}
              >
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowInput(false)
                  }}
                >
                  Hủy
                </Button>
                <Button
                  style={{ marginLeft: 6 }}
                  onClick={() => {
                    handleReply()
                  }}
                >
                  Phản hồi
                </Button>
              </div>
            </ReplyWrap>
          )}
        </Content>
      </Block>
      {nestedComments}
    </div>
  )
}

export default Comment

const Block = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 2rem;
`
const Image = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: 1px solid #ccc;
`
const Content = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  margin-left: 1rem;
  justify-content: center;
  flex-direction: column;
  & p {
    display: block;
  }
`
const Time = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  color: #aba6a6;
  margin-block: 0.8rem;
`
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.6rem;
`

const Like = styled.img`
  width: 1.6rem;
  cursor: pointer;
`

const Reply = styled.div`
  margin-left: 1.8rem;
`
const Input = styled.div`
  height: 2.6rem;
  flex: 1;
  outline: none;
  position: relative;
  margin-top: 1rem;
  margin-left: 1rem;
  border-bottom: 1px solid black;
  &:before {
    display: ${(props) => {
      console.log(props.theme)
      return props?.theme?.displayLabel ? "block" : "none"
    }};
    content: "Phản hồi...";
    cursor: text;
    font-size: 1.5rem;
    color: #ccc;
  }
`
const ReplyWrap = styled.div`
  margin-top: 10px;
`
const BlockStar = styled.div`
  display: flex;
`
const StyledStar = styled(Star)`
  width: 1.2rem;
`
