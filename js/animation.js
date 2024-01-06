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
  const width = document.documentElement.clientWidth + 50;
  const segments = 100;
  const interval = width / segments;
  const amplitude = 40; // 물결의 진폭
  const wavelengthFactor = 0.05; // 파장 길이 조정 계수
  const animationSpeed = 1; // 애니메이션 속도 조정 (초 단위)

  let points1 = [],
    points2 = [];
  for (let i = 0; i <= segments; i++) {
    points1.push({ x: i * interval, y: -30 });
    points2.push({ x: i * interval, y: -30 }); // 두 번째 선의 포인트도 동일하게 설정
  }

  function updatePolyline() {
    wave1.setAttribute("points", points1.map((p) => `${p.x},${p.y}`).join(" "));
    wave2.setAttribute("points", points2.map((p) => `${p.x},${p.y}`).join(" "));
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
        onUpdate: updatePolyline,
      });
    });
  }

  animateWave(points1, 1, "+"); // 첫 번째 선
  animateWave(points2, 1.5, "-"); // 두 번째 선 (지연 시간과 방향을 달리함)

  // PORT-FOLIO 글자

  const glitch = document.querySelector(".container p");
  let repeatCount = 0;

  // 글리치 효과를 위한 랜덤한 값 생성 함수
  function randomGlitchParams() {
    return {
      x: Math.random()*1000-500, // 좌우로 랜덤하게 이동
      scale: Math.random() * 0.1 + 0.9, // 랜덤한 크기 변화
      color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      })`, // 랜덤한 색상
      duration: 0.05, // 짧은 지속 시간
      repeat: 3, // 한 번 반복
      yoyo: true, // 원래 상태로 돌아감
      ease: "none", // 선형 이징
      onComplete: repeatCount === 4 ? resetElement : null
    };
  }

  function resetElement() {
    gsap.to(glitch, { x: 0, y: 0, scale: 1, color: 'white', duration: 0.1, opacity:1 });
  }

  gsap.from(glitch,1,{
    opacity:0
  })
  function runGlitchAnimation() {
    if (repeatCount < 3) {
      gsap.to(glitch, randomGlitchParams());
      repeatCount++;
      setTimeout(runGlitchAnimation, 500); // 다음 애니메이션 예약
    }
  }
  
  runGlitchAnimation(); // 애니메이션 시작
});
