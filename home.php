<?php

/*
Theme Name: Monami
Version: 1.0
Template Name: main
*/

get_header('home');

?>


<section class="panel" id="homeSection">
    <img />
    <div class="wave_line">
        <svg>
            <polyline id="wave1" />
        </svg>
        <svg>
            <polyline id="wave2" />
        </svg>
    </div>
    <div class="container">
        <p>CSY</br>PORT-FOLIO</p>
    </div>
    <!-- <button class="basic"></button> -->

</section>
<section class="panel" id="introSection">
    <div class="wave">
        <!-- 위로 화살표 -->
        <div class="up">
            <i class="fa-regular fa-hand-point-up"></i>
        </div>
    </div>
    <div class="pictureContainer">
        <div class="mypicture"></div>
    </div>
    <div class="contentsList">
        <div class="contents show">
            <div class="contentsTitle">안녕하세요!</br></div>
            <div class="contentsText">
                <p style="font-size: x-large;">새로운 지식을 배우는 것을 좋아하고, 코딩이 즐거운</br>
                <span style="border-radius: 3px;background-color:#ffc0cbb8;font-weight:900;">Front-End 개발자</span> 최승연입니다. </p>
            </div>
            <button class="moreBtn">
                <div class="typing-container">
                    <span id="typed-text"></span>
                    <div class="cursor"></div>
                    <div class="search"><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>
            </button>

        </div>
        <div class="contents next">
            <div class="contentsTitle">I WANT TO BE...</br></div>
            <div class="contentsText">
                <p>🎇 사용의 편의성을 중요시 여기는 개발자</br>🎇 문제해결을 위한 고민과 새로운 아이디어를 이야기하는 것을 즐기는 개발자</p>
            </div>
            <button class="moreBtn">
            <div class="typing-container">
                    <span id="typed-text"></span>
                    <div class="cursor"></div>
                    <div class="search"><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>
            </button>
        </div>
        <div class="contents">
            <div class="contentsTitle">I STUDIED...</br></div>
            <div class="contentsText">
                <ul>
                    <li>
                        <div class="subTitle">
                            📅 2022.09.12~2022.12.30</br>
                            📢 엘리스 SW 트랙 3기</br>
                        </div>
                        <div class="projectName">
                            <ul>
                                <li>
                                    <div>(Team)마녀상점: 나에게 필요한 상품을 추천해주는 신비한 인터넷 쇼핑몰</div>
                                </li>
                                <li>
                                    <div>(Team)CodiBuddy: 개발자 스터디 구하기 웹서비스</div></br>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="subTitle">
                            📅 2022.01.10~2022.01.21</br>
                            📢 실전 메타버스 제작하기</br>
                        </div>
                        <div class="projectName">
                            <ul>
                                <li>
                                    <div>Moving-Maze: 거미 몬스터를 피해 통과하는 미로 게임</div></br>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="subTitle">
                            📅 2020.07.25~2020.12.25</br>
                            📢 광주 인공지능 사관학교 1기</br>
                        </div>
                        <div class="projectName">
                            <ul>
                                <li>
                                    <div>(Team)Tweety: 정맥 및 안면 인식을 통한 출입제한 시스템</div></br>
                                </li>
                            </ul>
                        </div>
                    </li>

                </ul>
            </div>

        </div>

    </div>
</section>
<section id="projectSection">
    <div class="contentsTitle">
        <div class="titleName">Project</div>
        <p>이 페이지는 제가 참여한 다양한 프로젝트들을 소개하는 공간입니다.
            이곳에는 팀 프로젝트뿐만 아니라 개인 프로젝트도 포함되어 있습니다.
            대부분의 프로젝트들은 교육 기관에서 제공한 서버를 통해 배포되었기 때문에 현재 실제로 운영되는 페이지는 존재하지 않습니다.
            하지만, 프로젝트의 코드와 세부 내용은 GitHub에서 확인하실 수 있습니다.
        </p>
        <p><i class="fas fa-envelope"></i> Email: csykik@naver.com</p>
        <p><i class="fas fa-phone"></i> phone: 010-4931-0660</p>
        <div class="git" onclick="location.href='https://github.com/petiteZel'"><i class="fa-brands fa-github"></i>
            <h3>petiteZel</h3>
        </div>

    </div>

    <!-- 워드프레스 글 목록 불러오기 -->
    <!--  -->
    <div class="projectList">
        <button class="carousel-button prevBtn"><i class="fa-solid fa-chevron-left"></i></button>
        <?php
        // $args = 

        $pageArray = new WP_Query(
            array(
                'posts_per_page' => -1,  // 모든 페이지를 가져옴
                'post_type'      => 'page',
                'orderby'        => 'rand'
            )
        );

        if ($pageArray->have_posts()) {
            while ($pageArray->have_posts()) {
                $pageArray->the_post();

                $page_id = get_the_ID(); // 현재 페이지의 ID
                $title = get_the_title(); // 페이지 제목
                $excerpt = get_the_excerpt(); // 페이지 요약
                $permalink = get_permalink(); // 페이지 주소
                $thumbnail = get_the_post_thumbnail_url($page_id, 'full'); // 썸네일 이미지 URL

                $stacks = get_post_meta(get_the_ID(), 'stacks', true);
                $stacksText = esc_html($stacks);
                $stacksList = explode(",", $stacksText);
                
                // 각 페이지 정보 출력 (여기서는 예시로 HTML 구조를 사용)
                echo '<div class="projectContainer"><div class="pageinfo">';
                if ($thumbnail) {
                    echo '<img src="' . esc_url($thumbnail) . '" alt="' . esc_attr($title) . '" />';
                }
                echo '</div><div class="overCard">';
                echo '<h2>' . esc_html($title) . '</h2>';
                if ($stacks) {
                    echo '<div class="stacks">';
                    foreach($stacksList as $stack){
                        echo '<img id="'.$stack.'" src="'.get_template_directory_uri().'/img/'.$stack.'.svg" />';
                    };
                    echo '</div>';
                }
                echo '<p>' . esc_html($excerpt) . '</p>';
                echo '<a href="' . esc_url($permalink) . '">Read More</a>';
                echo '</div></div>';
                // echo 'what';
            }
            wp_reset_postdata();
        } else {
            echo '<p>No pages found.</p>';
        }
        ?>
        <button class="carousel-button nextBtn"><i class="fa-solid fa-chevron-right"></i></button>
    </div>

</section>

<!-- <section class="panel" id="privateSection" style="background-color: aqua;">HI</section>

<div class="hi">wowwwwwwwwwwww</div> -->
<!-- <section class="panel1" style="background-color: black;"></section> -->


<?php
get_footer();
?>

<!-- <div class="introSection">
    <div class="mypicture"></div>
    <div class="contentsList">
        <div class="contents"></div>
        <div class="contents"></div>
        <div class="contents"></div>
    </div>
</div> -->

<!-- 
<section class='panel' style="background-color: red;"></section>
<section class='panel' style="background-color: aqua;"></section>
<section class='panel' style="background-color: blue;"></section> -->