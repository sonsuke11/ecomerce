import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react"
import "./Toast.scss"
const Toast = forwardRef((props, ref) => {
  const [list, setList] = useState([])
  useImperativeHandle(ref, () => ({
    showToast: (type, message) => {
      let toastProps = null
      switch (type) {
        case "success":
          toastProps = { id: list.length, variant: "success", message }
          break
        case "error":
          toastProps = { id: list.length, variant: "danger", message }
          break
        default:
          toastProps = {}
          break
      }
      setList([...list, toastProps])
    },
  }))
  const classNames = (variant) =>
    ["toast__item", variant].filter((x) => x).join(" ")
  useEffect(() => {
    const interval = setInterval(() => {
      if (list.length > 0) {
        const newList = [...list]
        newList.shift()
        setList(newList)
      }
    }, 3000)
    return () => {
      clearInterval(interval)
    }
  }, [list])

  const handleRmoveToast = (id) => {
    const newList = [...list].filter((item) => item.id !== id)
    setList(newList)
  }
  return (
    <div className="toast__wrap">
      {list.map((item) => (
        <div className={classNames(item?.variant)} key={item?.id}>
          <button
            className="toast__close"
            onClick={() => handleRmoveToast(item?.id)}
          >
            x
          </button>
          {item?.message}
        </div>
      ))}
    </div>
  )
})

export default Toast
