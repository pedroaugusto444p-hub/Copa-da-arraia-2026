export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-slate-800 mb-4">404</h1>
        <p className="text-slate-500 mb-8">Página não encontrada</p>
        <a href="/" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition-colors">
          Voltar ao início
        </a>
      </div>
    </div>
  );
}
