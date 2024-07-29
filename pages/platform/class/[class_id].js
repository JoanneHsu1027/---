import React, { useState, useEffect } from 'react'
import Layout from '@/components/layout/layout'
import styles from '../../../styles/platform/platform-style.module.css'
import SideBarPc from '@/components/platform/side-bar-pc'
import SideBarMobile from '@/components/platform/side-bar-mobile'
import ClassBlock from '@/components/platform/article-block'
import LoginModal from '@/components/member/LoginModal'
import { useAuth } from '@/contexts/member/auth-context'
import { useRouter } from 'next/router'
import swal from 'sweetalert2'

export default function ClassId() {
  const router = useRouter()
  const { auth } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [classId, setClassId] = useState(router.query.class_id || '')

  useEffect(() => {
    if (router.query.class_id) {
      setClassId(router.query.class_id)
    }
  }, [router.query.class_id])

  useEffect(() => {
    console.log(`ClassId: ${classId}`)
  }, [classId])

  const handleCreateArticle = () => {
    if (!auth.b2c_id) {
      swal
        .fire({
          text: '請先登入會員！',
          icon: 'error',
        })
        .then(() => {
          setShowModal(true) // 在警告框關閉後顯示登錄窗口
        })
    } else {
      router.push('/platform/article/create') // 確保路徑正確
    }
  }

  return (
    <>
      <section className={`${styles.BgImg} ${styles.AllFont}`}>
        <Layout title="貓狗論壇" pageName="article-list">
          <div className="container mb-5">
            <div className="row">
              <div className="col-xl-3 col-lg-12">
                <SideBarPc />
              </div>
              <div className="col-xl-9 col-lg-12">
                <div
                  className={`container card my-3 ${styles.Rounded5} border-0 h-100`}
                >
                  <div className="row">
                    <div
                      style={{ minHeight: '80vh' }}
                      className="col-lg-12 col-md-12 d-flex flex-column m-1"
                    >
                      <SideBarMobile />

                      <ClassBlock classId={classId} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </section>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  )
}
