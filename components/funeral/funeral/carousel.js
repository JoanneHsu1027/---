import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default function Carousel() {
  return (
    <>
      {/* <!-- carousel --> */}
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-12 p-0">
            <div
              id="carouselExampleSlidesOnly"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="60000" // 设置轮播速度为 1000 毫秒（1 秒）
            >
              <div className="carousel-inner">
                <div className="carousel-item ">
                  <img
                    src="/funeral/77.jpg"
                    className="d-block w-100 img-fluid"
                    alt="..."
                  />
                </div>
                <div className="carousel-item active">
                  <img
                    src="/funeral/33.jpg"
                    className="d-block w-100 img-fluid"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/funeral/66.jpg"
                    className="d-block w-100 img-fluid"
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- carousel --> */}
    </>
  )
}
