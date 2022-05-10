export const formatCurrent = (param) =>
  Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "VND",
  }).format(param)

export const getMessageError = (param) => param.response.data.error
