export default function Footer() {
  return (
    <footer className="w-full">
      <p className="text-center text-sm font-light text-gray opacity-50 dark:text-darkTextGray">
        Tiberius (beta) © {new Date().getFullYear()}
      </p>
    </footer>
  )
}
