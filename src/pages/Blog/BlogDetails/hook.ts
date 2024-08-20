import { ReceivedProps } from './type'

const useBlogDetails = (props: ReceivedProps) => {
  return {
    ...props
  }
}
export type Props = ReturnType<typeof useBlogDetails>
export default useBlogDetails
