import React from "react"
import "./FileSelect.scss"

const FileSelect = ({ fileBase64, onChange, file, required, error }) => {
  console.log("object :>> ", file?.hasOwnProperty("lastModified"))
  console.log("file", file)
  return (
    <div>
      <input
        type="file"
        className="file__input"
        name={file?.name || file?.fileName}
        onChange={(e) => {
          onChange(e.target.files[0])
        }}
      />
      {error && required && <div className="input__error--text">{error}</div>}
      {file?.lastModified && (
        <img
          src={URL.createObjectURL(file)}
          className="file_image"
          alt="product"
        />
      )}
      {file && file?.file && (
        <img
          src={`data:image/png;base64,${file?.file}`}
          className="file_image"
          alt="product"
        />
      )}
    </div>
  )
}

export default FileSelect
