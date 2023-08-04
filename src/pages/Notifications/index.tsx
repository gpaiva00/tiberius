export default function Notifications() {
  return (
    <>
      {/* title container */}
      <div className="mb-2 flex w-full items-center px-4">
        <h1 className="default-header-title">Notificações</h1>
      </div>
      {/* content container */}
      <div className="h-full w-full overflow-y-scroll rounded-default">
        <div className="mt-20 flex flex-1 items-center justify-center">
          <p className="text-gray-400">Sem notificações por enquanto.</p>
        </div>
      </div>
    </>
  )
}
