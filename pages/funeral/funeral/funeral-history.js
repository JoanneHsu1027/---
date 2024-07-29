import { useState, useEffect } from 'react'
import Layout from '@/components/layout/layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/member/auth-context'
import { BOOKING_GET_ITEM } from '@/configs/funeral/api-path'

export default function FuneralHistory() {
  const router = useRouter()
  const { auth } = useAuth()
  const [data, setData] = useState([])
  const [latestReservation, setLatestReservation] = useState(null)
  const [latestBooking, setLatestBooking] = useState(null)

  useEffect(() => {
    // 預約紀錄
    const fetchReservation = async () => {
      try {
        const response = await fetch(`http://localhost:3001/reservation`)
        console.log('Response status:', response.status)
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        console.log('Received reservation data:', data)
        if (data && data.rows && Array.isArray(data.rows)) {
          const sortedReservation = data.rows.sort(
            (a, b) => b.reservation_id - a.reservation_id,
          )
          setLatestReservation(sortedReservation[0])
          console.log(
            'Sorted and set latest reservation:',
            sortedReservation[0],
          )
        } else {
          console.error('Invalid data structure for reservation:', data)
        }
      } catch (error) {
        console.error('Error fetching reservation:', error)
      }
    }
    // 契約購買紀錄
    const fetchBookingData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/booking`)
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        if (data.success && data.rows && data.rows.length > 0) {
          const sortedBookings = data.rows.sort(
            (a, b) => b.booking_id - a.booking_id,
          )
          setLatestBooking(sortedBookings[0])
        } else {
          console.error('No booking data found')
        }
      } catch (error) {
        console.error('Error fetching booking:', error)
      }
    }

    const fetchProjectName = async () => {
      if (router.isReady && router.query.fk_project_id) {
        const url = `${BOOKING_GET_ITEM}/${router.query.fk_project_id}`
        try {
          const response = await fetch(url)
          if (!response.ok) throw new Error('Network response was not ok')
          const myData = await response.json()
          if (myData.data) {
            setData(myData.data)
          } else {
            console.error('No data received from API')
          }
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    fetchReservation()
    fetchBookingData()
    fetchProjectName()

    const intervalId = setInterval(() => {
      fetchReservation()
      fetchBookingData()
    }, 60000)

    return () => clearInterval(intervalId)
  }, [router.isReady, router.query.fk_project_id])

  return (
    <Layout>
      <div className="container my-5">
        <div className="row">
          <h2>預約/ 訂單紀錄</h2>
          {/* 預約 */}
          <div className="col-12 justify-content-center align-items-center mb-3 mt-3">
            {/* <!-- 線上預約紀錄 --> */}
            <div
              className="card my-3"
              style={{
                maxWidth: '100%',
                height: 'auto',
                marginTop: '0.3rem',
                borderTopRightRadius: '30px',
                borderTopLeftRadius: '30px',
                marginBottom: '0',
              }}
            >
              <div
                className="card-header text-center"
                style={{
                  backgroundColor: '#F6D554',
                  color: '#ffffff',
                  borderTopRightRadius: '30px',
                  borderTopLeftRadius: '30px',
                }}
              >
                線上預約紀錄
              </div>
              <div className="card-body">
                <div className="row no-border-table">
                  <div className="col-12 col-md-6">
                    <table>
                      <tbody>
                        <tr>
                          <th>預約編號: </th>
                          <td>{latestReservation?.reservation_id}</td>
                        </tr>
                        <tr>
                          <th>預約日期: </th>
                          <td>
                            {new Date(
                              latestReservation?.reservation_date,
                            ).toLocaleDateString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-12 col-md-6">
                    <table>
                      <tbody>
                        <tr>
                          <th>備註: </th>
                          <td>{latestReservation?.note}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- 線上預約紀錄 --> */}
          </div>
          {/* 預約 */}
          {/* 契約購買 */}
          <div className="col-12 justify-content-center align-items-center mb-5">
            {/* <!-- 生前契約購買紀錄 --> */}
            <div
              className="card my-3"
              style={{
                maxWidth: '100%',
                height: 'auto',
                marginTop: '0.3rem',
                borderTopRightRadius: '30px',
                borderTopLeftRadius: '30px',
              }}
            >
              <div
                className="card-header text-center"
                style={{
                  backgroundColor: '#F6D554',
                  color: '#ffffff',
                  borderTopRightRadius: '30px',
                  borderTopLeftRadius: '30px',
                }}
              >
                生前契約購買紀錄
              </div>
              <div className="card-body">
                <div className="row no-border-table">
                  <div className="col-12 col-md-6">
                    <table>
                      <tbody>
                        <tr>
                          <th>訂單編號: </th>
                          <td>{latestBooking?.booking_id}</td>
                        </tr>
                        <tr>
                          <th>契約名稱:</th>
                          <td>{latestBooking?.project_name}</td>
                        </tr>
                        <tr>
                          <th>訂單狀態: </th>
                          <td>{latestBooking?.booking_state}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-12 col-md-6">
                    <table>
                      <tbody>
                        <tr>
                          <th>訂單日期: </th>
                          <td>
                            {new Date(
                              latestBooking?.booking_date,
                            ).toLocaleDateString()}
                          </td>
                        </tr>
                        <tr>
                          <th>總金額: </th>
                          <td>{latestBooking?.booking_price} 元</td>
                        </tr>
                        <tr>
                          <th>發票號碼:</th>
                          <td>{latestBooking?.billNumber}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- 生前契約購買紀錄 --> */}
          </div>
          {/* 契約購買 */}
        </div>

        <style jsx>{`
          .card-header,
          .card-body,
          .form-check-label,
          .form-label,
          .form-control,
          .form-select {
            font-size: 1.2rem;
          }

          .form-control {
            flex-grow: 1;
          }

          th,
          td {
            font-size: 1.2rem;
          }

          @media (max-width: 768px) {
            .container,
            .row,
            .leftCard,
            .rightCard {
              width: 100%;
              margin: 0 auto;
            }
            th,
            td {
              font-size: 0.9rem;
            }
          }

          .card-header,
          .card-title {
            font-size: 1.2rem;
          }

          .form-check-label,
          .form-label,
          .form-control,
          .form-select {
            font-size: 1rem;
          }
        `}</style>
      </div>
    </Layout>
  )
}
