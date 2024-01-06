document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(MotionPathPlugin);
  gsap.set(".wave", { scaleY: 0 });

  gsap.to(".wave", {
    duration: 2,
    ease: "power1.inOut",
    scaleY: 1,
    repeat: -1,
    yoyo: true,
  });

  const wave1 = document.querySelector("#wave1");
  const wave2 = document.querySelector("#wave2");
  const width = document.documentElement.clientWidth;
  const segments = 100;
  const interval = width / segments;
  const amplitude = 20; // 물결의 진폭
  const wavelengthFactor = 0.05; // 파장 길이 조정 계수
  const animationSpeed = 2; // 애니메이션 속도 조정 (초 단위)

  let points1 = [], points2 = [];
  for (let i = 0; i <= segments; i++) {
      points1.push({ x: i * interval, y: 50 });
      points2.push({ x: i * interval, y: 50 }); // 두 번째 선의 포인트도 동일하게 설정
  }
  
  function updatePolyline() {
      wave1.setAttribute("points", points1.map(p => `${p.x},${p.y}`).join(" "));
      wave2.setAttribute("points", points2.map(p => `${p.x},${p.y}`).join(" "));
  }
  updatePolyline();

  function animateWave(points, delayMultiplier, direction) {
      points.forEach((point, i) => {
          gsap.to(point, {
              duration: animationSpeed,
              y: `${direction}=${amplitude}`,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: i * wavelengthFactor * delayMultiplier,
              onUpdate: updatePolyline
          });
      });
  }

  animateWave(points1, 1, '+'); // 첫 번째 선
  animateWave(points2, 1.2, '-'); // 두 번째 선 (지연 시간과 방향을 달리함)

});
