import { useCallback } from "react"
import { useRequest } from "./useRequest"
import { TodoBox } from "../Components/TodoBox/TodoBox"

export const useBoxes = () => {

  const {requestWithAuth} = useRequest()

  const getBoxes = useCallback(async () => {

    const res = await requestWithAuth('/api/box/', 'GET', {})
    const data = await res.json()
    const arr = [Object.values(data).map((val,idx) => {
      // console.log(val['id'])
    return <TodoBox key={idx+1} data={{text:val['box_name'], color:val['color'], id:val['id']}}
  />})]
    return arr
  }, [requestWithAuth])

  return {getBoxes}
}