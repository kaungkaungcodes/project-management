export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex justify-center p-2">
      <section className="w-full max-w-sm">{children}</section>
    </div>
  )
}
