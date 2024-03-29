import React from "react"
import FileSelect from "../../atoms/FileSelect/FileSelect"

const FileElement = ({ file, setFile, fileBase64 }) => {
  return (
    <FileSelect
      fileBase64={fileBase64}
      required
      file={file}
      onChange={(value) => {
        setFile(value)
      }}
    />
  )
}

export default FileElement
