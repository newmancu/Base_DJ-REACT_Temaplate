

import { useCallback } from 'react'
import { useRequest } from '../../Hooks/useRequest'
import { prepareHex, getLighten } from '../../Helpers/prepareColor'
import './TodoBox.sass'

export const TodoBox = (props) => {

  const {requestWithAuth} = useRequest()

  const updateBox = () => {

  }

  const deleteBox = useCallback(async () => {
    const res = await requestWithAuth('/api/box/'+props.data.id+'/', 'DELETE')
    return res
  }, [requestWithAuth, props])

  const color = prepareHex(props.data.color)

  return (
    <div className="todo-box" style={{'backgroundColor':props.data.color, 'color':getLighten(color)}}>
      <p className="todo-box__text">{props.data.text}</p>
      <button onClick={updateBox}>Update Box</button>
      <button onClick={deleteBox}>Delete Box</button>
    </div>
  )
}