import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { notificationController } from '~/controllers/notificationController'
import { signUp } from '~/requests/authService'
import { useAppDispatch } from '~/store/hook'
import { doSignUp } from '~/store/slices/auth-slice'

export interface SignUpFormData {
  name: string
  email: string
  password: string
  address: string
  phone: string
  level: string
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isLoading, setLoading] = useState(false)
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    level: ''
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.address ||
      !formData.phone ||
      !formData.level
    ) {
      notificationController.error({ message: 'Please fill in all fields' })
      return
    }

    try {
      const response = await signUp(formData)

      if (response.errors) {
        const errorMessage = Object.values(response.errors).flat().join(', ')
        notificationController.error({ message: errorMessage })
      } else {
        notificationController.success({ message: 'Sign-up successful!' })
        navigate('/login') // Redirect to login page
      }
    } catch (error) {
      notificationController.error({ message: 'An unexpected error occurred. Please try again.' })
      console.error('Sign-up error:', error)
    }
  }

  return (
    <section id='form'>
      <div className='login-form'>
        {/* login form */}
        <h2>Signup to your account</h2>
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
          <input
            type='text'
            name='name'
            placeholder='Enter Your Name'
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type='address'
            name='address'
            placeholder='Enter Address'
            value={formData.address}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='phone'
            placeholder='Enter Phone'
            value={formData.phone}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='level'
            placeholder='Enter Level'
            value={formData.level}
            onChange={handleInputChange}
          />

          <button type='submit' className='btn btn-default'>
            {isLoading ? 'Loading...' : 'Register'}
          </button>
          <span>
            Do you have an account? <Link to={'/login'}>Login</Link>
          </span>
        </form>
      </div>
    </section>
  )
}

export default Register
