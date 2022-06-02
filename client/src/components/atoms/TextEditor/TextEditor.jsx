import React, { useState } from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

const TextEditor = ({ value, onChange }) => {
  const [data, setData] = useState(value)
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onReady={(editor) => {
          // You can store the "editor" and use when it isんpm needed.
          console.log("Editor is ready to use!", editor)
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          setData(data)
        }}
        onBlur={(event, editor) => {
          onChange(data)
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor)
        }}
      />
    </div>
  )
}

export default TextEditor
