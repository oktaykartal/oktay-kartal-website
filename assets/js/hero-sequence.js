const heroVideo = document.querySelector(".hero-video");

if (heroVideo) {
  const videos = [
    "assets/video/oktay-kartal-hero.mp4",
    "assets/video/cover-page-addition.mp4"
  ];
  let videoIndex = 0;

  const playVideo = (index) => {
    videoIndex = index;
    heroVideo.src = videos[videoIndex];
    heroVideo.play().catch(() => {});
  };

  heroVideo.addEventListener("ended", () => {
    playVideo((videoIndex + 1) % videos.length);
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) heroVideo.pause();
}
