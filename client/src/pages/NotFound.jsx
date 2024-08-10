function NotFound() {
  return (
    <div className="w-screen">
    <p className="text-4xl text-center mb-32 mt-10 py-5 shadow-xl bg-purple-500 text-purple-200 font-bold">El recurso solicitado no existe</p>
    <a href="/" className="items-center bg-indigo-700 m-5 p-5 text-lg rounded-xl shadow-lg hover:bg-indigo-500">Volver al inicio</a>
    </div>
  )
}

export default NotFound