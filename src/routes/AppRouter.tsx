import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Footer from 'src/components/Footer/Footer'
import Wrapper from 'src/components/Wrapper/Wrapper'
import Header from '../components/Header/Header'
import { routes } from './Routes'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={<Wrapper>{element}</Wrapper>} />
        ))}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default AppRouter
