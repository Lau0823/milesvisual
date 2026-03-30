import Navbar from "@/components/navBar";
import GalleryGrid from "@/components/GalleryGrid";
import Footer from "@/components/Footer";
import { allPhotos } from "@/data/galery";

export default function PrebodasPage() {
  const photos = allPhotos.filter((photo) => photo.category === "prebodas");

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-neutral-900">
      <Navbar />
      <GalleryGrid
        title="Prebodas"
        subtitle="Galería"
        photos={photos}
      />
      <Footer />
    </main>
  );
}