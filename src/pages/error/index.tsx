export default function Error() {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center px-40 py-10">
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        {/* replace this image for a minimalist 404 error image */}
        <img
          src="https://i.imgur.com/qIufhof.png"
          alt="404 error"
          width={300}
        />

        <h1 className="text-4xl font-extrabold ">Oops!</h1>
        <p className="text-base text-gray">Ocorreu um erro, tente de novo mais tarde.</p>
      </div>
    </main>
  )
}
