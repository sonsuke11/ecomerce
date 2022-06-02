import React, { memo, useEffect, useState } from "react"
import styled from "styled-components"
import useCategory from "../../../hooks/useCategory"
import images from "../../../themes/image"
import { StatusOption } from "../../../utils/constants"
import Button from "../../atoms/Button/Button"
import Input from "../../atoms/Input/Input"
import RadioGroup from "../../atoms/RadioGroup/RadioGroup"
import Select from "../../atoms/Select/Select"
import FileElement from "./FileElement"

const ProductCreateForm = ({
  error,
  data,
  setData,
  onClickSave,
  onClickCancel,
  arrayFileElement,
  setArrayFileElement,
  setError,
}) => {
  const { getAllCategory } = useCategory()
  const [categoryOption, setCategoryOption] = useState()
  useEffect(() => {
    getAllCategory(
      { size: 100 },
      (res) => {
        const options = res?.list?.map((item) => ({
          value: item._id,
          label: item.name,
        }))
        setCategoryOption(options)
      },
      () => {}
    )
  }, [])

  return (
    <div className="category__info">
      <h3>Add Product</h3>
      <div className="row">
        <div className="col c-6 ">
          <Input
            label="Tên sản phẩm"
            required
            error={error?.name}
            value={data?.name}
            onChange={(value) => {
              setData({ ...data, name: value })
              setError({ ...error, name: "" })
            }}
          />
          <br />
          <br />
          <Input
            label="Giá bán"
            required
            type="number"
            error={error?.price}
            value={data?.price}
            onChange={(value) => {
              setData({ ...data, price: value })
              setError({ ...error, price: "" })
            }}
          />
          <br />
          <br />
          <Input
            label="Số lượng"
            required
            type="number"
            error={error?.instock}
            value={data?.instock}
            onChange={(value) => {
              setData({ ...data, instock: value })
              setError({ ...error, instock: "" })
            }}
          />

          <br />
          <br />
          <Input
            label="Giá nhập"
            required
            type="number"
            error={error?.rootPrice}
            value={data?.rootPrice}
            onChange={(value) => {
              setData({ ...data, rootPrice: value })
              setError({ ...error, rootPrice: "" })
            }}
          />
          <br />
          <br />
          <Select
            label="Danh mục"
            options={categoryOption}
            error={error?.categoryId}
            value={
              categoryOption?.find((item) => item.value === data?.categoryId) ||
              null
            }
            onChange={(select) => {
              setData({ ...data, categoryId: select?.value })
              setError({ ...error, categoryId: "" })
            }}
          />
          <br />
          <br />
          <div className="input__block">
            <div style={{ marginBottom: "0.8rem" }}>Mô tả sản phẩm</div>
            <StyledTextArea
              rows="6"
              label="Description"
              value={data?.description}
              className={[error?.description ? "error" : ""].join(" ")}
              onChange={(e) => {
                setData({ ...data, description: e.target.value })
                setError({ ...error, description: "" })
              }}
            />
            <div className="input__error--text">{error?.description}</div>
          </div>
        </div>
        <div className="col c-6">
          <div className="row">
            {arrayFileElement?.map((Item, index) => (
              <>
                <Item
                  required
                  fileBase64={data?.imagesBase64?.[index]}
                  file={data?.images?.[index]}
                  setFile={(value) => {
                    let newImages = [...data.images]

                    if (newImages.length < index + 1) {
                      newImages.push(value)
                    } else {
                      newImages = newImages.map((it, i) => {
                        if (i === index) {
                          return value
                        }
                        return it
                      })
                    }

                    setData({ ...data, images: newImages })
                  }}
                />
                <br />
              </>
            ))}
          </div>
          <br />
          <div className="col c-12">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                icon={images.icPlusWhite}
                variant="outline-success"
                onClick={() =>
                  setArrayFileElement([...arrayFileElement, FileElement])
                }
              >
                Add an image
              </Button>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <div style={{ display: "flex" }}>
        <Button variant="success" onClick={onClickSave}>
          Save
        </Button>
        <Button
          variant="warning"
          style={{ marginLeft: "1rem" }}
          onClick={onClickCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default memo(ProductCreateForm)

const StyledTextArea = styled.textarea`
  resize: none;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  padding: 6px;
  display: block;
  outline: none;
  border: 1px solid #171717;
  border-radius: 5px;
`
