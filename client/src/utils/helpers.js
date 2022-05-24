export const formatCurrent = (param) => {
  if (!param) {
    return 0
  }
  return Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "VND",
  }).format(param)
}
export const formatNumber = (param, string = ",") => {
  return param?.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, string)
}

export const getMessageError = (param) => param.response.data.error
