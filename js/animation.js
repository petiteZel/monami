document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(MotionPathPlugin);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  const tl = gsap.timeline();
  tl.from('header',{
    delay:1,
    duration:1,
    backgroundColor:"rgb(0,0,0)",
    height:"100vh",
    ease:"power1.out"
  }).from(['.logo', '.menu'],{
    duration:1,
    opacity:0,
    ease:"power1.inout"
  })

  // // 아래 파도 버튼 애니메이션-------------------------------------------------------
  gsap.set(".wave", { scaleY: 0 });
  gsap.to(".wave", {
    duration: 2,
    ease: "power1.inOut",
    scaleY: 1,
    repeat: -1,
    yoyo: true,
  });
  document
    .querySelector(".wave")
    .addEventListener("click", function () {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: "#introSection", offsetY: 200 },
      });
    });

  //위 파도 라인 애니메이션-------------------------------------------------------
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

  // PORT-FOLIO 글자 글리치 효과-------------------------------------------------------
  const glitch = document.querySelector(".container p");
  let repeatCount = 0;

  // 글리치 효과를 위한 랜덤한 값 생성 함수(좌우 위치, 크기, 색깔)
  function randomGlitchParams() {
    return {
      x: Math.random() * 1000 - 500, // 좌우로 랜덤하게 이동
      scale: Math.random() * 0.1 + 0.9, // 랜덤한 크기 변화
      color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      })`, // 랜덤한 색상
      delay:2,
      duration: 0.05, // 짧은 지속 시간
      repeat: 3, // 한 번 반복
      yoyo: true, // 원래 상태로 돌아감
      ease: "none", // 선형 이징
      onComplete: repeatCount === 4 ? resetElement : null,
    };
  }

  function resetElement() {
    tl.to(glitch, {
      x: 0,
      y: 0,
      scale: 1,
      color: "white",
      duration: 0.1,
      opacity: 1,
    });
  }

  gsap.from(glitch, 1, {
    opacity: 0,
  });

  function runGlitchAnimation() {
    if (repeatCount < 3) {
      gsap.to(glitch, randomGlitchParams());
      repeatCount++;
      setTimeout(runGlitchAnimation, 500); // 다음 애니메이션 예약
    }
  }

  runGlitchAnimation(); // 애니메이션 시작

  // // 스크롤 다운 애니메이션-------------------------------------------------------
  let cards = gsap.utils.toArray(".panel");
  cards.forEach((card)=>{
    ScrollTrigger.create({
      trigger:card,
      start:"top top",
      pin:true,
      pinSpacing:false,
      markers:true,
      snap: 1 / (2-1)
    })

  })

  // INTROSECTION 스크롤 다운 애니메이션----------------------------------------------------
  // 클래스를 추가하는 함수
  function addClass(element, className) {
    element.classList.add(className);
  }

  // 클래스를 제거하는 함수
  function removeClass(element, className) {
    element.classList.remove(className);
  }

  const moreBtn = document.querySelectorAll(".moreBtn");
  const moreBtnTl = gsap.timeline();

  moreBtn.forEach((btn)=>{
    btn.addEventListener("click", () => {

    moreBtnTl.to(".show", 1, {
      opacity: 0,
      ease:"power1.inout",
      onComplete: ()=> removeClass(document.querySelector(".show"), "show")
    }).to('.next',1,{
      opacity:1,
      ease:"power1.out",
      onComplete: ()=> {
        addClass(document.querySelector(".next"), "show");
        removeClass(document.querySelector(".show"), "next");
        if(document.querySelector(".show").nextElementSibling){addClass(document.querySelector(".show").nextElementSibling, "next");
      }}
    })

  });
})

// projectSection------------------------------------------------------------------------------------
const projectList = document.querySelector('.projectList');
const nextButton = projectList.querySelector('.next');
const prevButton = projectList.querySelector('.prev');
const pageInfos = projectList.querySelectorAll('.pageinfo');

let scrollAmount = 0; // 스크롤 이동량 초기화
const scrollStep = pageInfos[0].clientWidth; // 스크롤 이동 거리 설정 (첫 번째 .pageinfo 너비)

nextButton.addEventListener('click', () => {
  // 현재 스크롤 위치에서 한 페이지 너비만큼 추가
  scrollAmount += scrollStep;
  // 최대 스크롤 가능 값으로 제한
  scrollAmount = Math.min(scrollAmount, projectList.scrollWidth - projectList.clientWidth);

  // 스크롤 애니메이션 실행
  projectList.scrollTo({
    left: scrollAmount,
    behavior: 'smooth' // 부드러운 스크롤 효과
  });
});

prevButton.addEventListener('click', () => {
  // 현재 스크롤 위치에서 한 페이지 너비만큼 빼기
  scrollAmount -= scrollStep;
  // 최소 스크롤 가능 값 0으로 제한
  scrollAmount = Math.max(scrollAmount, 0);

  // 스크롤 애니메이션 실행
  projectList.scrollTo({
    left: scrollAmount,
    behavior: 'smooth' // 부드러운 스크롤 효과
  });
});

});
