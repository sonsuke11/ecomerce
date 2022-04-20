import React from "react"
import images from "../../../themes/image"
import Button from "../../atoms/Button/Button"
import Input from "../../atoms/Input/Input"
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
  return (
    <div className="category__info">
      <h3>Add Product</h3>
      <div className="row">
        <div className="col c-6 ">
          <Input
            label="Product Name"
            required
            error={error?.name}
            value={data?.name}
            onChange={(value) => setData({ ...data, name: value })}
          />
          <br />
          <Input
            label="Price"
            required
            type="number"
            error={error?.price}
            value={data?.price}
            onChange={(value) => setData({ ...data, price: value })}
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
            ))}
          </div>
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
