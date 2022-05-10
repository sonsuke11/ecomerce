const productReducer = (state = {}, action) => {
  switch (action.type) {
    case "@product/SET_LIST_PRODUCT":
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default productReducer
