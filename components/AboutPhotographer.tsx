export default function AboutPhotographer() {
  return (
    <section
      id="about"
      className="container-editorial py-16 md:py-24"
    >
      <div className="grid items-center gap-10 border border-soft bg-white p-6 md:grid-cols-2 md:p-10">
        <div className="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80"
            alt="Fotógrafo Miles Visual"
            className="h-[460px] w-full object-cover md:h-[620px]"
          />
        </div>

        <div className="max-w-xl">
          <p className="section-label">Acerca del fotógrafo</p>
          <h2 className="section-title mt-4">
            Una mirada elegante para historias reales.
          </h2>

          <p className="body-copy mt-6">
            Soy el ojo detrás de MILES VISUAL. Mi trabajo nace del deseo de
            capturar emociones auténticas con una estética limpia, refinada y
            atemporal. Busco crear imágenes que se sientan íntimas, honestas y
            visualmente memorables.
          </p>

          <p className="body-copy mt-5">
            Mi enfoque combina sensibilidad documental con dirección editorial,
            para que cada sesión conserve naturalidad sin perder sofisticación.
            Más que tomar fotos, construyo recuerdos que puedan sentirse una y
            otra vez.
          </p>
        </div>
      </div>
    </section>
  );
}