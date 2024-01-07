document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(MotionPathPlugin);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  // const tl = gsap.timeline();
  // tl.from('header',{
  //   delay:1,
  //   duration:1,
  //   backgroundColor:"rgb(0,0,0)",
  //   height:"100vh",
  //   ease:"power1.out"
  // }).from(['.logo', '.menu'],{
  //   duration:1,
  //   opacity:0,
  //   ease:"power1.inout"
  // })

  // // // 아래 파도 버튼 애니메이션-------------------------------------------------------
  // gsap.set(".wave", { scaleY: 0 });
  // gsap.to(".wave", {
  //   duration: 2,
  //   ease: "power1.inOut",
  //   scaleY: 1,
  //   repeat: -1,
  //   yoyo: true,
  // });
  // document
  //   .querySelector(".wave")
  //   .addEventListener("click", function () {
  //     gsap.to(window, {
  //       duration: 1,
  //       scrollTo: { y: "#introSection", offsetY: 200 },
  //     });
  //   });

  // //위 파도 라인 애니메이션-------------------------------------------------------
  // const wave1 = document.querySelector("#wave1");
  // const wave2 = document.querySelector("#wave2");
  // const width = document.documentElement.clientWidth + 50;
  // const segments = 100;
  // const interval = width / segments;
  // const amplitude = 40; // 물결의 진폭
  // const wavelengthFactor = 0.05; // 파장 길이 조정 계수
  // const animationSpeed = 1; // 애니메이션 속도 조정 (초 단위)

  // let points1 = [],
  //   points2 = [];
  // for (let i = 0; i <= segments; i++) {
  //   points1.push({ x: i * interval, y: -30 });
  //   points2.push({ x: i * interval, y: -30 }); // 두 번째 선의 포인트도 동일하게 설정
  // }

  // function updatePolyline() {
  //   wave1.setAttribute("points", points1.map((p) => `${p.x},${p.y}`).join(" "));
  //   wave2.setAttribute("points", points2.map((p) => `${p.x},${p.y}`).join(" "));
  // }
  // updatePolyline();

  // function animateWave(points, delayMultiplier, direction) {
  //   points.forEach((point, i) => {
  //     gsap.to(point, {
  //       duration: animationSpeed,
  //       y: `${direction}=${amplitude}`,
  //       repeat: -1,
  //       yoyo: true,
  //       ease: "sine.inOut",
  //       delay: i * wavelengthFactor * delayMultiplier,
  //       onUpdate: updatePolyline,
  //     });
  //   });
  // }

  // animateWave(points1, 1, "+"); // 첫 번째 선
  // animateWave(points2, 1.5, "-"); // 두 번째 선 (지연 시간과 방향을 달리함)

  // // PORT-FOLIO 글자 글리치 효과-------------------------------------------------------
  // const glitch = document.querySelector(".container p");
  // let repeatCount = 0;

  // // 글리치 효과를 위한 랜덤한 값 생성 함수(좌우 위치, 크기, 색깔)
  // function randomGlitchParams() {
  //   return {
  //     x: Math.random() * 1000 - 500, // 좌우로 랜덤하게 이동
  //     scale: Math.random() * 0.1 + 0.9, // 랜덤한 크기 변화
  //     color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
  //       Math.random() * 255
  //     })`, // 랜덤한 색상
  //     delay:2,
  //     duration: 0.05, // 짧은 지속 시간
  //     repeat: 3, // 한 번 반복
  //     yoyo: true, // 원래 상태로 돌아감
  //     ease: "none", // 선형 이징
  //     onComplete: repeatCount === 4 ? resetElement : null,
  //   };
  // }

  // function resetElement() {
  //   tl.to(glitch, {
  //     x: 0,
  //     y: 0,
  //     scale: 1,
  //     color: "white",
  //     duration: 0.1,
  //     opacity: 1,
  //   });
  // }

  // gsap.from(glitch, 1, {
  //   opacity: 0,
  // });

  // function runGlitchAnimation() {
  //   if (repeatCount < 3) {
  //     gsap.to(glitch, randomGlitchParams());
  //     repeatCount++;
  //     setTimeout(runGlitchAnimation, 500); // 다음 애니메이션 예약
  //   }
  // }

  // runGlitchAnimation(); // 애니메이션 시작

  // // 스크롤 다운 애니메이션-------------------------------------------------------
  let cards = gsap.utils.toArray(".panel");
  let tops = cards.map((card) => ScrollTrigger.create({ trigger: card }));

  cards.forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card,
      start: () =>
        card.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
      pin: true,
      pinSpacing: false,
      markers: true,
    });
  });

  ScrollTrigger.create({
    snap: {
      snapTo: (progress, self) => {
        let panelStarts = tops.map((st) => st.start);
        let snapScroll = gsap.utils.snap(panelStarts, self.scroll());
        console.log(self.scroll())
        
        if (self.scroll() > ScrollTrigger.maxScroll(window)-350) {
          snapScroll = ScrollTrigger.maxScroll(window);
        }

        return gsap.utils.normalize(
          0,
          ScrollTrigger.maxScroll(window),
          snapScroll
        );
      },
      duration: 0.5,
    },
  });

  // INTROSECTION 스크롤 다운 애니메이션----------------------------------------------------
  // gsap.to('.contentsList .contents')

  document.querySelectorAll('.contents').forEach((panel, i) => {
    ScrollTrigger.create({
        trigger: panel,
        start: 'top top',  
        pin: true, // 요소를 고정
        pinSpacing: false, // 요소 사이의 공간을 유지하지 않음
        markers: true, // 개발 중 마커 표시 (개발 완료 후 제거 가능)
        id: 'contents' + (i + 1), // 마커를 위한 ID, 개발 후 제거 가능
    });
});
});
