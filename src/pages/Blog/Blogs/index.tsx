import { ReceivedProps, blogDataType } from './type'
import '../../../index.css'
import useBlogs from './hook'
import { useEffect, useState } from 'react'
import { getAllDataBlogs } from '~/requests/blogService'
import { Link } from 'react-router-dom'

const BlogsLayout = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getAllBlogs()
  }, [])

  const getAllBlogs = async () => {
    try {
      const response = await getAllDataBlogs()
      if (response && response.data && response.data.blog && response.data.blog.data) {
        setData(response.data.blog.data)
      } else {
        console.error('Invalid response structure:', response)
      }
    } catch (error) {
      console.error('Error fetching blog data:', error)
    }
  }

  function renderData() {
    if (data.length > 0) {
      return data.map((item: blogDataType) => (
        <div className='single-blog-post' key={item.id}>
          <h3>{item.title}</h3>
          <div className='post-meta'>
            <ul>
              <li>
                <i className='fa fa-user' /> Mac Doe
              </li>
              <li>
                <i className='fa fa-clock-o' /> 1:33 pm
              </li>
              <li>
                <i className='fa fa-calendar' /> DEC 5, 2013
              </li>
            </ul>
            <span>
              <i className='fa fa-star' />
              <i className='fa fa-star' />
              <i className='fa fa-star' />
              <i className='fa fa-star' />
              <i className='fa fa-star-half-o' />
            </span>
          </div>
          <Link to={`/blog/detail/${item.id} `}>
            <img src={`http://localhost/laravel8/public/upload/Blog/image/${item.image}`} />
          </Link>
          <p>{item.description}</p>
          <Link className='btn btn-primary' to={`/blog/detail/${item.id} `}>
            Read More
          </Link>
        </div>
      ))
    }
  }

  return (
    <div className='col-sm-9'>
      <div className='blog-post-area'>
        <h2 className='title text-center'>Latest From our Blog</h2>
        {renderData()}
        <div className='pagination-area'>
          <ul className='pagination'>
            <li>
              <a href='' className='active'>
                1
              </a>
            </li>
            <li>
              <a href=''>2</a>
            </li>
            <li>
              <a href=''>3</a>
            </li>
            <li>
              <a href=''>
                <i className='fa fa-angle-double-right' />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const Blog = (props: ReceivedProps) => {
  return <BlogsLayout {...useBlogs(props)} />
}

export default Blog
