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
        }

        echo get_the_title();
        
        if ($next_post_link) {
            echo '<span>'.$next_post_link.'</span>';
        }

        // 페이지 콘텐츠 출력
        echo '</h1></header><div class="contentArea">
        <main id="main" class="siteMain pinkMirror" role="main">';
        the_content();

        // 페이지 네비게이션 (이전 / 다음 페이지 링크)
        // wp_link_pages( array(
        //     'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'your-theme-slug' ),
        //     'after'  => '</div>',
        // ) );

    endwhile; // 페이지 루프 종료
    ?>
    <button class="moodBtn pinkMirror"><div class="btnCase pinkMirror">Mood</br>Board</div></button>
    <?php
        
        ?>
    </main><!-- #main -->
</div><!-- #primary -->

<?php
// 사이드바 불러오기 (선택 사항)
// get_sidebar();

// 푸터 불러오기
get_footer();
?>