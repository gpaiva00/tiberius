export default function Error() {
  return (
    <main className='flex flex-1 min-h-screen px-40 py-10 items-center justify-center'>
      <div className='flex flex-1 flex-col gap-3 items-center justify-center'>
        {/* replace this image for a minimalist 404 error image */}
        <img src='https://i.imgur.com/qIufhof.png' alt='404 error' width={300} />

        <h1 className='text-4xl font-extrabold text-black'>Oops!</h1>
        <p className='text-gray text-base'>Página não encontrada.</p>
      </div>
    </main>
  )
}