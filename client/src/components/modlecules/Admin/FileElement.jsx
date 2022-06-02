import React, { memo } from "react"
import FileSelect from "../../atoms/FileSelect/FileSelect"

const FileElement = ({ file, setFile, fileBase64 }) => {
  return (
    <div className="col c-6">
      <FileSelect
        required
        displayFile="top"
        file={file}
        onChange={(value) => {
          setFile(value)
        }}
      />
    </div>
  )
}

export default memo(FileElement)
