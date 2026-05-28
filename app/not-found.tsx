import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--mv-cream)] px-4 text-center">
      <div className="space-y-6 max-w-lg">
        <h1 className="text-[120px] md:text-[160px] font-bold leading-none tracking-tighter text-[var(--mv-ink)] opacity-10">
          404
        </h1>
        
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold uppercase tracking-widest text-[var(--mv-ink)]">
            Historia no encontrada
          </h2>
          <p className="text-black/60 font-medium leading-relaxed italic">
            "Hay momentos que no se pueden capturar, y esta página es uno de ellos."
          </p>
        </div>

        <div className="pt-8">
          <Link 
            href="/"
            className="inline-block bg-[var(--mv-ink)] text-white px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[var(--mv-sage)] transition-all duration-500 shadow-xl"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
      
      {/* Elementos decorativos minimalistas */}
      <div className="fixed top-12 left-12 w-px h-24 bg-black/10 hidden md:block" />
      <div className="fixed bottom-12 right-12 w-px h-24 bg-black/10 hidden md:block" />
    </div>
  );
}

