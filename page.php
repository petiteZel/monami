<?php

/*
Theme Name: Monami
Version: 1.0
Template Name: main
*/

?>

<?php
// 헤더 불러오기
get_header('page'); 
?>


    <?php
    // 페이지 루프 시작
    while ( have_posts() ) : the_post();
        echo '<header class="pageTitle pinkMirror"><h1 class="headerContainer">';

        $next_post_link = get_next_post_link('%link', '<i class="fa-solid fa-chevron-right"></i>');
        $prev_post_link = get_previous_post_link('%link', '<i class="fa-solid fa-chevron-left"></i>');
        
        if($prev_post_link) {
            echo '<span>'.$prev_post_link.'</span>';
        }else{
            echo '<i style="color:lightgrey" class="fa-solid fa-chevron-left"></i>';
        };

        echo get_the_title();
        
        if ($next_post_link) {
            echo '<span>'.$next_post_link.'</span>';
        }else{
            echo '<i style="color:lightgrey" class="fa-solid fa-chevron-right"></i>';
        };

        // 페이지 콘텐츠 출력
        echo '</h1></header><div class="contentArea">
        <nav class="pageNav">
        <ul>
        <li><a id="goToServiceIntro"><span>기획 및 개요</span></a></li>
        <li><a id="goToServiceFeat"><span>기능 및 서비스</span></a></li>
        <li><a id="goToGitBtn"><span>사이트 보기</span></a></li>
        </ul></nav>
        <main id="main" class="siteMain pinkMirror" role="main">
        <div style="width:95vw;height:90vh;position:absolute;z-index:3;" class="blockScroll"></div>';
        the_content();

    endwhile;
    ?>
    <?php
        
        ?>
    </main>
</div>

<?php
// 푸터 불러오기
get_footer();
?>
