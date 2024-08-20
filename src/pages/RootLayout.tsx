import { Outlet } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'
import MainFooter from '~/components/MainFooter'
import MainSideBar from '~/components/MainSidebar'
import '../index.css'

function RootLayout() {
  return (
    <section>
      <MainNavigation />
      <div className='container'>
        <MainSideBar />
        <Outlet />
      </div>
      <MainFooter />
    </section>
  )
}

export default RootLayout
