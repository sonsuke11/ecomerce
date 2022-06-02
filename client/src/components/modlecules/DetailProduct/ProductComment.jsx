import React from "react"
import styled from "styled-components"
import Comment from "./Comment"
import images from "../../../themes/image"

const ProductComment = ({ data, id, fetchComment }) => {
  return (
    <Wrap className="col c-12">
      <Title>Đánh giá</Title>
      <br />
      {data?.length === 0 && (
        <NoData>
          <img src={images.icNoEvaludated} alt="no comment" />
          <p>Chưa có đánh giá nào</p>
        </NoData>
      )}
      {data?.map((comment) => (
        <Comment
          id={id}
          key={comment.id}
          data={comment}
          fetchComment={fetchComment}
        />
      ))}
    </Wrap>
  )
}

export default ProductComment

const Wrap = styled.div``
const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`

const NoData = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    width: 8rem;
    height: 8rem;
    margin-bottom: 2rem;
  }
`
