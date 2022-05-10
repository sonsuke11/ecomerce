import { HIDE_TOAST, SHOW_TOAST } from "../types"

export const toastRdeucer = (state = [], action) => {
  switch (action?.type) {
    case SHOW_TOAST:
      return [...state, action?.payload]
    case HIDE_TOAST:
      return [...state, action?.payload]
    default:
      return state
  }
}
