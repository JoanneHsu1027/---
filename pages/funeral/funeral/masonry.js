import React, { useEffect } from 'react'
import Layout from '@/components/layout/layout'
import MasonryCard from '@/components/funeral/masonry/masonry-card'
import Project from './project'
import Service from './service'
import { useRouter } from 'next/router'
import Slider from '../appointment/slider'
import AppointmentService from '../appointment/appointment-service'
import Environment from '../appointment/environment'
import Question from '../appointment/question'

export default function MasonryPage() {
  const router = useRouter()

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div>
              {/* 頂端圖片 */}
              {/* <div>
                <img
                  src="/funeral/Vector 436.png"
                  alt="Description of the image"
                  width={1440}
                  height={100}
                  style={{
                    width: '100%',
                    height: 'auto',
                    transform: 'rotate(180deg)',
                    zIndex: '0',
                    position: 'relative',
                  }}
                />
              </div> */}
              {/* navbar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  zIndex: '1',
                }}
              >
                <Layout />
              </div>
            </div>
            <MasonryCard />
          </div>
        </div>
      </div>
      <div style={{ marginTop: '150px' }}>
        <Project />
      </div>
      <Service />
      <Slider />
      <AppointmentService />
      <Environment />
      <Question />
    </>
  )
}
