import { Outlet } from "react-router-dom"
import {Footer} from '../../../Components/Common/Footer'
import {Header} from '../../../Components/Common/Header'

import './MainWrapper.sass'

export const MainWrapper = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}