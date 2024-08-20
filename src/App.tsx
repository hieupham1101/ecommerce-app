import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RootLayout from './pages/RootLayout'
import BlogDetails from './pages/Blog/BlogDetails'
import Blogs from './pages/Blog/Blogs'
import Login from './pages/Auth/login'
import Register from './pages/Auth/register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/blog', element: <Blogs /> },
      { path: '/blog/detail/:params', element: <BlogDetails /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
