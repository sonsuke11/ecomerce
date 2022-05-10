import { HIDE_TOAST, SHOW_TOAST } from "../types"

export const showToast = () => {
  return { type: SHOW_TOAST }
}
export const hideToast = () => {
  return { type: HIDE_TOAST }
}
