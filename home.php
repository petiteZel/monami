<?php

/*
Theme Name: Monami
Version: 1.0
Template Name: main
*/

get_header();

?>


<section class="homeSection">
    <img />
    <button class="basic"></button>
    <div class="wave">
        <!-- 위로 화살표 -->
        <div class="up">
            <i class="fa-regular fa-hand-point-up"></i>
        </div>
    </div>
    <div class="wave_line">
        <svg width="100%" height="100px">
            <polyline id="wave1" />
        </svg>
        <svg width="100%" height="100px">
            <polyline id="wave2" />
        </svg>

    </div>
</section>
<section class="introSection"></section>
<section class="teamSection"></section>
<section class="privateSection"></section>

<?php
get_footer();
?>