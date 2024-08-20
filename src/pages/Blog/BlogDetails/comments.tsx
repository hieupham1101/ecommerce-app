const Comments = ({ comments }) => {
  console.log('data comment', comments)

  const renderData = () => {
    if (comments && comments.length > 0) {
      return (
        <div className='response-area'>
          <h2>{`${comments.length} response(s)`}</h2>
          <ul className='media-list'>
            {comments.map((item) => (
              <li className='media' key={item.id}>
                <a className='pull-left' href='#'>
                  <img
                    className='media-object'
                    alt=''
                    src={`http://localhost/laravel8/public/upload/user/avatar/${item.image}`}
                  />
                </a>
                <div className='media-body'>
                  <ul className='sinlge-post-meta'>
                    <li>
                      <i className='fa fa-user' />
                      {item.name_user}
                    </li>
                    <li>
                      <i className='fa fa-clock-o' /> {item.created_at.slice(11, 16)}
                    </li>
                    <li>
                      <i className='fa fa-calendar' /> DEC 5, 2013
                    </li>
                  </ul>
                  <p>{item.comment}</p>
                  <a className='btn btn-primary' href=''>
                    <i className='fa fa-reply' />
                    Reply
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    } else {
      console.log('No data available')
      return <p>No comments available.</p>
    }
  }

  return renderData()
}

export default Comments
