import React, { useEffect, useState } from "react"
import useCategory from "../../../hooks/useCategory"
import images from "../../../themes/image"
import { formatNumber } from "../../../utils/helpers"
import Button from "../../atoms/Button/Button"
import Input from "../../atoms/Input/Input"
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

  console.log(
    "categoryOption?.find((item) => item.value === data?.categoryId)",
    categoryOption?.find((item) => item.value === data?.categoryId)
  )
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
            onChange={(value) => setData({ ...data, name: value })}
          />
          <br />
          <Input
            label="Giá bán"
            required
            type="number"
            error={error?.price}
            value={data?.price}
            onChange={(value) => setData({ ...data, price: value })}
          />
          <br />
          <Input
            label="Số lượng"
            required
            type="number"
            error={error?.instock}
            value={data?.instock}
            onChange={(value) => setData({ ...data, instock: value })}
          />
          <br />
          <Input
            label="Giá nhập"
            required
            type="number"
            error={error?.rootPrice}
            value={data?.rootPrice}
            onChange={(value) => setData({ ...data, rootPrice: value })}
          />
          <br />
          <Select
            options={categoryOption}
            value={
              categoryOption?.find((item) => item.value === data?.categoryId) ||
              null
            }
            onChange={(select) =>
              setData({ ...data, categoryId: select?.value })
            }
          />
          <br />
          <Input
            label="Description"
            error={error?.description}
            value={data?.description}
            onChange={(value) => setData({ ...data, description: value })}
          />
        </div>
        <div className="col c-6">
          <div className="col c-6">
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

export default ProductCreateForm
