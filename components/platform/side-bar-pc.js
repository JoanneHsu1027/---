import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/platform/platform-style.module.css'
import { BsFillTriangleFill, BsSearch } from 'react-icons/bs'
import { useAuth } from '@/contexts/member/auth-context'
import LoginModal from '@/components/member/LoginModal'
import swal from 'sweetalert2'
import Link from 'next/link'

export default function SideBarPc({ onSearch }) {
  const router = useRouter()
  const [activea, setActivea] = useState('')
  const [sidebarOffset, setSidebarOffset] = useState(140)
  const [showModal, setShowModal] = useState(false)
  const { auth } = useAuth()

  useEffect(() => {
    if (router.pathname.includes('class')) {
      setActivea('class')
    } else if (router.pathname.includes('article')) {
      setActivea('article')
    } else if (router.pathname.includes('favorite')) {
      setActivea('favorite')
    } else if (router.pathname.includes('article-page')) {
      setActivea('article-page')
    }
  }, [router.pathname])

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        //大螢幕設定
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      setSidebarOffset(isBottom ? 100 : 140)

      //小螢幕設定
      //   window.outerHeight + window.scrollY >= document.body.offsetHeight
      // setSidebarOffset(isBottom ? 10 : 140)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    const keyword = event.target.search.value
    onSearch(keyword)
  }

  const handleFavoriteClick = (event) => {
    if (!auth.b2c_id) {
      event.preventDefault() // 防止導航
      swal
        .fire({
          text: '請先登入會員！',
          icon: 'error',
        })
        .then(() => {
          setShowModal(true) // 在警告框關閉後顯示登入視窗
        })
    }
  }

  return (
    <>
      <div className={`col-xl-3 d-none d-xl-block mb-0 ${styles.AllFont}`}>
        <div
          className={`bg-white ${styles.W10} ${styles.Rounded5} ${styles.H60} px-3 pt-4 position-fixed d-flex flex-column justify-content-between`}
          style={{ top: `${sidebarOffset}px`, transition: 'top 0.3s ease' }}
        >
          <div className="d-flex flex-column">
            <form className="d-flex mb-5" onSubmit={handleSearch}>
              <input
                className={`${styles.BorderEndDel} form-control border-success border-end-0`}
                type="search"
                name="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className={`${styles.BorderStartDel} btn btn-outline-success border-start-0`}
                type="submit"
              >
                <BsSearch />
              </button>
            </form>
            <Link
              href="/platform/"
              type="button"
              className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} ${activea === '' ? styles.PageSelect : ''} btn btn-outline-dark mb-2`}
            >
              論壇首頁
            </Link>
            <Link
              href="/platform/class"
              type="button"
              className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} ${activea === 'class' ? styles.PageSelect : ''} btn btn-outline-dark mb-2`}
            >
              主題分類
            </Link>
            <Link
              href="/platform/article"
              type="button"
              className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} ${activea === 'article' ? styles.PageSelect : ''} btn btn-outline-dark mb-2`}
            >
              最新文章
            </Link>
            <Link
              href="/platform/favorite"
              type="button"
              className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} ${activea === 'favorite' ? styles.PageSelect : ''} btn btn-outline-dark mb-2`}
              onClick={handleFavoriteClick}
            >
              文章收藏
            </Link>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <a className={`${styles.AReset} ${styles.GoTopBtn} mb-2`} href="#">
              Go Top <BsFillTriangleFill />
            </a>
          </div>
        </div>
      </div>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  )
}
