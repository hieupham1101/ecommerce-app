import { notificationController } from '~/controllers/notificationController'
import { readToken, readUser } from '../../../services/localStorage.service'
import { useState } from 'react'
import { httpApi } from '~/requests/api'

const ReplyBox = ({ id_blog, addComment }) => {
  const [comment, setComment] = useState('')
  const token = readToken()

  const onChangeReplyBox = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value)
  }

  const user = readUser()

  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }
  }

  const handleReplyBox = () => {
    if (token === 'bearerToken' || token === undefined) {
      notificationController.error({ message: 'Please login before commenting!' })
    } else {
      if (comment.trim() === '') {
        notificationController.error({ message: 'Please enter a comment!' })
        return
      } else {
        const formData = new FormData()
        formData.append('id_user', user?.id?.toString() ?? '')
        formData.append('name_user', user?.name ?? '')
        formData.append('image_user', user?.avatar ?? '')
        formData.append('id_comment', '0')
        formData.append('id_blog', id_blog)
        formData.append('comment', comment)

        httpApi
          .post(`/blog/comment/${id_blog}`, formData, config)
          .then((response) => {
            addComment(response.data.data)
            setComment('')
            // console.log(response.data.data.comment)
            notificationController.success({ message: 'Comment posted successfully!' })
          })
          .catch((error) => {
            console.error(error)
            notificationController.error({ message: 'Failed to post comment!' })
          })
      }
    }
  }

  return (
    <div className='replay-box'>
      <div className='row'>
        <div className='col-sm-12'>
          <h2>Leave a replay</h2>
          <div className='text-area'>
            <div className='blank-arrow'>
              <label>{user?.name}</label>
            </div>
            <span>*</span>
            <textarea name='message' rows={11} value={comment} onChange={onChangeReplyBox} />
            <button className='btn btn-primary' type='submit' onClick={handleReplyBox}>
              Post comment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReplyBox
