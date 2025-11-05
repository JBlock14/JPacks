function animarLogoYRedirigir(nombre, url) {
  const logoMap = {
    modrinth: "../assets/gui/logo/modrinth.png",
    curseforge: "../assets/gui/logo/curseforge.png",
    planetmc: "../assets/gui/logo/planetmc.png",
    youtube: "../assets/gui/logo/youtube.png",
    discord: "../assets/gui/logo/dc.png"
  };

  const overlay = document.getElementById("logoOverlay");
  const img = document.getElementById("logoImage");

  img.src = logoMap[nombre];
  overlay.classList.remove("show");
  void overlay.offsetWidth;
  overlay.classList.add("show");

  setTimeout(() => {
    overlay.classList.remove("show");
    window.open(url, "_blank");
  }, 600);
}

