import React, { useState } from "react"
import styled from "styled-components"
import Button from "../../atoms/Button/Button"
import Star from "./Star"

const defaultStar = [...Array(5).fill(true)]
const ProductItemOrder = ({ product, onClickEvaluate }) => {
  const [valueInput, setValueInput] = useState()
  const [starFill, setStarFill] = useState(defaultStar)
  const [isVote, setIsVote] = useState()
  const refresh = () => {
    setValueInput("")
    setStarFill(defaultStar)
  }

  const filterStar = (value) => {
    const newArrStar = starFill.map((item, index) => {
      if (index <= value) {
        return true
      }
      return false
    })
    setStarFill(newArrStar)
  }
  const handleHover = (value) => {
    if (!isVote) {
      filterStar(value)
    }
  }

  const handleClick = (value) => {
    setIsVote(!isVote)
    filterStar(value)
  }

  const renderRank = (
    <Block>
      {starFill.map((item, index) => (
        <Star
          fill={item}
          onHover={handleHover}
          index={index}
          onClick={handleClick}
        />
      ))}
    </Block>
  )
  return (
    <Wrap>
      <Row>
        <Img
          src={`data:image/png;base64,${product.productId.images[0].file}`}
        />
        <ProductName>{product.productId.name}</ProductName>
      </Row>
      {renderRank}
      <TextArea
        value={valueInput}
        onChange={(e) => setValueInput(e.target.value)}
        placeholder="Nhận xét về sản phẩm..."
      />
      <Button
        style={{ marginLeft: "auto" }}
        onClick={() =>
          onClickEvaluate(
            product.productId._id,
            { vote: starFill.filter((i) => i).length, content: valueInput },
            product._id,
            refresh
          )
        }
      >
        Đánh giá
      </Button>
    </Wrap>
  )
}

export default ProductItemOrder

const Wrap = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 2rem;
  box-shadow: 4px 4px 10px #ccc;
  &:not(:first-child) {
    margin-top: 2rem;
  }
`
const Row = styled.div`
  display: flex;
  align-items: center;
`

const Img = styled.img`
  width: 8rem;
  height: 8rem;
  object-fit: cover;
`

const ProductName = styled.div`
  margin-left: 2rem;
  font-size: 2rem;
`
const TextArea = styled.textarea`
  min-height: 13rem;
  width: 100%;
  display: block;
  resize: none;
  margin-block: 2rem;
  outline: none;
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 1.6rem;
  font-family: "Open Sans", sans-serif;
`

const Block = styled.div`
  display: flex;
`
