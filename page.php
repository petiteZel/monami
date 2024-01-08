<?php

/*
Theme Name: Monami
Version: 1.0
Template Name: main
*/

?>

<?php
// 헤더 불러오기
get_header(); 
?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">

    <?php
    // 페이지 루프 시작
    while ( have_posts() ) : the_post();

        // 페이지 콘텐츠 출력
        the_content();

        // 페이지 네비게이션 (이전 / 다음 페이지 링크)
        // wp_link_pages( array(
        //     'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'your-theme-slug' ),
        //     'after'  => '</div>',
        // ) );

    endwhile; // 페이지 루프 종료
    ?>

    </main><!-- #main -->
</div><!-- #primary -->

<?php
// 사이드바 불러오기 (선택 사항)
get_sidebar();

// 푸터 불러오기
get_footer();
?>