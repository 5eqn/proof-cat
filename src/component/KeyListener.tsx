import { useEffect } from "react"

export interface KeyCallback {
  key: string,
  requireCtrl: boolean,
  callback: () => void,
}

export interface KeyListenerProps {
  callbacks: KeyCallback[]
}

const handler = (callbacks: KeyCallback[]) => (event: KeyboardEvent) =>
  callbacks.forEach((c) => {
    const satisfyCtrl = event.ctrlKey || !c.requireCtrl
    if (event.key === c.key && satisfyCtrl) {
      event.preventDefault()
      c.callback()
    }
  })

export function KeyListener(props: KeyListenerProps): JSX.Element {
  useEffect(() => {
    const h = handler(props.callbacks)
    document.addEventListener('keydown', h)
    return () => {
      document.removeEventListener('keydown', h)
    }
  }, [props.callbacks])
  return <div />
}
