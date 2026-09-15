// Banner con la imagen temática que subiste. Si en algún momento cambiás
// la imagen, solo reemplazá el archivo public/images/pokemon-hero.jpg
// por otro con el mismo nombre.
export default function BannerTematico() {
  return (
    <section className="seccion entrada" style={{ paddingTop: 0 }}>
      <img
        src="/images/pokemon-hero.jpg"
        alt="Temática Pokémon"
        className="banner-tematico"
      />
    </section>
  );
}
