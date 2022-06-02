import React from "react"
import Button from "../../atoms/Button/Button"
import Input from "../../atoms/Input/Input"
import "./CategoryEditInfo.scss"
const CategoryEditInfo = ({
  onClickSave,
  onClickCancel,
  data,
  setData,
  error,
  setError,
}) => {
  return (
    <div className="category__info">
      <h3>Thông tin danh mục</h3>
      <div className="row ">
        <div className="col c-6 category__input">
          <Input
            label="Category Name"
            required
            error={error?.name}
            value={data?.name}
            onChange={(value) => setData({ ...data, name: value })}
          />
        </div>
        {/* <div className="col c-6">
          <Input
            label="Category Path"
            required
            error={error?.path}
            value={data?.path}
            onChange={(value) => setData({ ...data, path: value })}
          />
        </div> */}
        <div className="col c-6">
          <Input
            label="Description"
            value={data?.description}
            onChange={(value) => setData({ ...data, description: value })}
          />
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

export default CategoryEditInfo
