import { ReceivedProps } from './type'

const useBlogs = (props: ReceivedProps) => {
  return {
    ...props
  }
}
export type Props = ReturnType<typeof useBlogs>
export default useBlogs
