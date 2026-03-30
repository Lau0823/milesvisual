export default function Footer() {
  return (
    <footer className="mt-12 bg-[#1f1c1c] py-10 text-white">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-5 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="text-lg tracking-tight">MILES VISUAL</p>
          <p className="mt-1 text-sm text-white/65">
            Fotografía editorial, elegante y atemporal.
          </p>
        </div>

        <div className="text-sm text-white/65">
          hello@milesvisual.com · @milesvisual
        </div>
      </div>
    </footer>
  );
}