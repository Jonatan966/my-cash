import { ToastContainer } from 'react-toastify'
import { useTheme } from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

export function Toast() {
  const { title } = useTheme()

  return <ToastContainer theme={title} />
}
