import { useRegisterSW } from 'virtual:pwa-register/react'

function ReloadPrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  // Функция для закрытия уведомления
  const close = () => {
    setNeedRefresh(false)
  }

  // Если нет обновлений, ничего не рендерим
  if (!needRefresh) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-popover border border-border rounded-lg shadow-lg max-w-sm animate-in slide-in-from-bottom duration-300">
      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium">
          Доступна новая версия приложения
        </div>
        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-1.5 text-xs font-medium bg-muted hover:bg-muted/80 rounded transition-colors"
            onClick={close}
          >
            Закрыть
          </button>
          <button
            className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded transition-colors"
            onClick={() => updateServiceWorker(true)}
          >
            Обновить
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReloadPrompt
