import React, { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import useOrder from "../../../hooks/useOrder"

import socketIOClient from "socket.io-client"
import { BASE_URL } from "../../../utils/constants"

const socket = socketIOClient("http://localhost:5000")
const TopProduct = () => {
  const { getDataOrderEveryDay } = useOrder()
  const [dataChart, setDataChart] = useState()
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
  }

  const data = {
    labels: [...Array.from({ length: 31 }, (_, i) => i + 1)],
    datasets: [
      {
        data: dataChart?.orderData,
        label: "Đơn hàng",
        borderColor: "#3cba9f",
        fill: false,
      },
      // {
      //   data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
      //   label: "Asia",
      //   borderColor: "#8e5ea2",
      //   fill: false,
      // },
      // {
      //   data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
      //   label: "Europe",
      //   borderColor: "#3cba9f",
      //   fill: false,
      // },
      // {
      //   data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
      //   label: "Latin America",
      //   borderColor: "#e8c3b9",
      //   fill: false,
      // },
      {
        data: dataChart?.priceData,
        label: "Doanh thu(x100.0000vnd)",
        borderColor: "#c45850",
        fill: false,
      },
    ],
  }

  useEffect(() => {
    getDataOrderEveryDay(
      {},
      (res) => {
        const orderData = res?.data?.map((i) => i.quantity)
        const priceData = res?.data?.map((i) => i.totalPrice / 100000)
        setDataChart({ orderData, priceData })
      },
      () => {}
    )
    fetch(`${BASE_URL}/activities`).then((data) => {
      console.log(data)
    })
  }, [])
  return <Line options={options} data={data} />
}

export default TopProduct
