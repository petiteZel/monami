<?php

/*
Theme Name: Monami
Version: 1.0
Template Name: main
*/

get_header();

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
        <div class="contents">
            <div class="contentsTitle">안녕하세요!</br></div>
            <div class="contentsText">
                <p>Front-End 개발자 최승연입니다.</p>
            </div>

        </div>
        <div class="contents">
            <div class="contentsTitle">I WANT TO BE...</br></div>
            <div class="contentsText">
                <p>어쩌구 저쩌구 개발자</br>어쩌구니 저쩌구니 개발자</p>
            </div>

        </div>
        <div class="contents">
            <div class="contentsTitle">I STUDIED...</br></div>
            <div class="contentsText">
                <ul>
                    <li>
                        <div class="subTitle">
                            2022.09.12~2022.12.30</br>
                            엘리스 SW 트랙 3기
                        </div>
                        <div class="projectName">
                            <ul>
                                <li>
                                    <div>마녀상점:</div>
                                </li>
                                <li>
                                    <div>CodiBuddy:</div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="subTitle">
                            2022.01.10~2022.01.21</br>
                            실전 메타버스 제작하기
                        </div>
                        <div class="projectName">
                            <ul>
                                <li>
                                    <div>Moving-Maze:</div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="subTitle">
                            2020.07.25~2020.12.25</br>
                            광주 인공지능 사관학교 1기
                        </div>
                        <div class="projectName">
                            <ul>
                                <li>
                                    <div>마녀상점:</div>
                                </li>
                                <li>
                                    <div>Tweety: 정맥 및 안면 인식을 통한 출입제한 시스템</div>
                                </li>
                            </ul>
                        </div>
                    </li>

                </ul>
            </div>

        </div>

    </div>
</section>
<section class="panel" id="projectSection">
    <div class="contentsTitle">Project</div>
    <!-- 워드프레스 글 목록 불러오기 -->
    <!--  -->
    <div class="projectList">
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

                // 각 페이지 정보 출력 (여기서는 예시로 HTML 구조를 사용)
                echo '<div class="pageinfo">';
                if ($thumbnail) {
                    echo '<img src="' . esc_url($thumbnail) . '" alt="' . esc_attr($title) . '" />';
                }
                echo '<h2>' . esc_html($title) . '</h2>';
                echo '<p>' . esc_html($excerpt) . '</p>';
                echo '<a href="' . esc_url($permalink) . '">Read More</a>';
                echo '</div>';
                // echo 'what';
            }
            wp_reset_postdata();
        } else {
            echo '<p>No pages found.</p>';
        }
        ?>
    </div>
</section>

<section class="panel" id="privateSection" style="background-color: aqua;">HI</section>

<!-- <div class="hi">wowwwwwwwwwwww</div> -->
<section class="panel" style="background-color: black;"></section>


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