import { httpApi } from './api'

export interface DetailBlogResponse {
  title: string
  image: string
  content: string
}

export const getAllDataBlogs = () => {
  return httpApi.get('/blog')
}

export const getDetailBlog = (id: string): Promise<DetailBlogResponse> => {
  return httpApi.get(`/blog/detail/${id}`)
}

export const comment = (loginPayload: CommentRequest, config, id: string): Promise<CommentRespon> =>
  httpApi.post<CommentRespon>(`/blog/comment/${id}`, { ...loginPayload }).then(({ data }) => data)
