import React from 'react'
import Carousel from '@/components/funeral/funeral/carousel'
import AppointmentService from './appointment/appointment-service'
import Service from './funeral/service'
import Project from './funeral/project'
import Environment from './appointment/environment'
import Question from './appointment/question'
import Layout from '@/components/layout/layout'

export default function FuneralPage() {
  return (
    <Layout>
      <Carousel />
      <AppointmentService />
      <Service />
      <Project />
      <Environment />
      <Question />
    </Layout>
  )
}
