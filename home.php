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
    <div class="wave_line">
        <svg>
            <polyline id="wave1" />
        </svg>
        <svg>
            <polyline id="wave2" />
        </svg>
    </div>
    <div class="container">
        <p>Welcome</p>
    </div>
    <!-- <button class="basic"></button> -->
    <div class="wave">
        <!-- 위로 화살표 -->
        <div class="up">
            <i class="fa-regular fa-hand-point-up"></i>
        </div>
    </div>
</section>
<section class="introSection"></section>
<section class="teamSection"></section>
<section class="privateSection"></section>

<?php
get_footer();
?>