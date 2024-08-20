import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { notificationController } from '~/controllers/notificationController'
import { login } from '~/requests/authService'
import { persistToken, persistUser } from '~/services/localStorage.service'
import { useAppDispatch } from '~/store/hook'

interface LoginFormData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [isLoading, setLoading] = useState(false)
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!formData.email || !formData.password) {
      notificationController.error({ message: 'Please fill in all fields' })
      return
    }

    try {
      const response = await login(formData)

      if (response.errors) {
        const errorMessage = Object.values(response.errors).flat().join(', ')
        notificationController.error({ message: errorMessage })
      } else {
        // Handle successful sign-up
        notificationController.success({ message: 'Login successful!' })
        persistToken(response.token)
        persistUser(response.Auth)
        navigate('/') // Redirect to login page
      }
    } catch (error) {
      // Handle any unexpected errors
      notificationController.error({ message: 'An unexpected error occurred. Please try again.' })
      console.error('Login error:', error)
    }
  }

  return (
    <section id='form'>
      <div className='login-form'>
        {/* login form */}
        <h2>Login to your account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            name='email'
            placeholder='Enter Email Address'
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type='password'
            name='password'
            placeholder='Enter Password'
            value={formData.password}
            onChange={handleInputChange}
          />
          <span>
            <input type='checkbox' className='checkbox' />
            Keep me signed in
          </span>
          <button type='submit' className='btn btn-default'>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
          <span>
            Don't have an account? <Link to={'/register'}>Sign up</Link>
          </span>
        </form>
      </div>
    </section>
  )
}

export default Login
