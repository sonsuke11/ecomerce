import React, { useRef } from "react"
import styled from "styled-components"
import images from "../../../themes/image"
import Button from "../Button/Button"
import "./FileSelect.scss"

const FileSelect = ({
  onChange,
  fileBase64,
  file,
  required,
  error,
  displayFile = "bottom",
  imgRadius,
}) => {
  const ref = useRef()
  const renderFileSelected = () => {
    return (
      <>
        {!file && (
          <ImageSelected
            style={{
              backgroundImage: `url(${images.icImageUpload})`,
              ...(imgRadius && { borderRadius: "50%" }),
            }}
            className="file_image"
          />
        )}
        {fileBase64 && (
          <ImageSelected
            style={{
              backgroundImage: `url(data:image/png;base64,${fileBase64})`,
              ...(imgRadius && { borderRadius: "50%" }),
            }}
            className="file_image"
          />
        )}
        {file?.lastModified && (
          <ImageSelected
            style={{
              backgroundImage: `url(${URL.createObjectURL(file)})`,
              ...(imgRadius && { borderRadius: "50%" }),
            }}
            className="file_image"
          />
        )}
        {file && file?.file && (
          <ImageSelected
            style={{
              backgroundImage: `url(data:image/png;base64,${file.file})`,
              ...(imgRadius && { borderRadius: "50%" }),
            }}
            className="file_image"
          />
        )}
      </>
    )
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {displayFile === "top" && renderFileSelected()}
      <br />
      <Button onClick={() => ref.current.click()}>Chọn ảnh</Button>
      <input
        ref={ref}
        type="file"
        className="file__input"
        name={file?.name || file?.fileName}
        onChange={(e) => {
          onChange(e.target.files[0])
        }}
      />
      {error && required && <div className="input__error--text">{error}</div>}
      <br />
      {displayFile === "bottom" && renderFileSelected()}
    </div>
  )
}

export default FileSelect

const ImageSelected = styled.div`
  width: 20rem;
  padding-top: 20rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: 1px solid #ccc;
`
