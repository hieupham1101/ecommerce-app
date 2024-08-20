import useBlog, { Props } from './hook'
import { ReceivedProps } from './type'
import '../../../index.css'
import { getDetailBlog } from '~/requests/blogService'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Rating from './rating'
import ReplyBox from './reply-box'
import { Image } from 'antd'
import Comments from './comments'

const BlogDetailsLayout = (props: Props) => {
  const { params } = useParams()
  const [data, setData] = useState([])
  const [listCmt, setListCmt] = useState([])

  useEffect(() => {
    fetchBlogDetail()
  }, [])

  const fetchBlogDetail = async () => {
    try {
      const response = await getDetailBlog(params)
      if (response && response.data && response.data.data) {
        setData(response.data.data)
        setListCmt(response.data.data.comment)
      } else {
        console.error('Invalid response structure:', response)
      }
    } catch (error) {
      console.error('Error fetching blog data:', error)
    }
  }

  const getComment = (newComment) => {
    setListCmt([...listCmt, newComment])
  }

  console.log(listCmt, 'list commnet')

  return (
    <section>
      <div className='col-sm-9'>
        <div className='blog-post-area'>
          <h2 className='title text-center'>Latest From our Blog</h2>
          <div className='single-blog-post'>
            <h3>{data.title}</h3>
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
              {/* <span>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star-half-o"></i>
								</span> */}
            </div>
            <div>
              <Image src={`http://localhost/laravel8/public/upload/Blog/image/${data.image}`} />
            </div>
            <p>{data.content}</p> <br />
            <div className='pager-area'>
              <ul className='pager pull-right'>
                <li>
                  <Link to={'/blog'}>Pre</Link>
                </li>
                <li>
                  <Link to={'/blog'}>Next</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Rating />
        <Comments comments={listCmt} />
        <ReplyBox id_blog={params} addComment={getComment} />
      </div>
    </section>
  )
}
const BlogDetails = (props: ReceivedProps) => {
  return <BlogDetailsLayout {...useBlog(props)} />
}
export default BlogDetails
