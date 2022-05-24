import images from "../themes/image"

export const footerRules = [
  {
    icon: images.icReturn,
    heading: "6 ngày đổi trả sản phẩm",
    content: "Đổi trả sản phẩm trong vòng",
  },
  {
    icon: images.icPhoneFooter,
    heading: "Hotline 1800 1000",
    content: "8h00-12h,T2-CN nghỉ tết âm lịch",
  },
  {
    icon: images.icSystemStore,
    heading: "Hệ thống cửa hàng",
    content: "gần 60 cửa hàng trên toàn quốc",
  },
  {
    icon: images.icTransformer,
    heading: "vận chuyển",
    content: "Đồng giá 25k toàn quốc",
  },
]

export const BASE_URL = "http://localhost:5000/api"

export const ADMIN = 2
export const USER = 1
export const APP_ROLES = {
  ADMIN,
  USER,
}

export const APP_ROUTES = {
  login: "/login",
  adminLogin: "/admin/login",
  listCategory: "/admin/category-list",
  editCategory: "/admin/category-edit",
}

export const Cancel = 0
export const Waitting = 1
export const Approved = 2
export const Transport = 3
export const Completed = 4
export const ORDER_STATUS = {
  Waitting,
  Approved,
  Transport,
  Completed,
}

export const ShipPrice = 25000
export const OrderStatusOption = [
  {
    label: "Đã hủy",
    value: Cancel,
  },
  {
    label: "Chờ xác nhận",
    value: Waitting,
  },
  {
    label: "Phê duyệt",
    value: Approved,
  },
  {
    label: "Vận Chuyển",
    value: Transport,
  },
  {
    label: "Hoàn thành",
    value: Completed,
  },
]
