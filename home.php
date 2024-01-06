<?php

/*
Theme Name: Monami
Version: 1.0
Template Name: main
*/

get_header();

?>


<section id="homeSection">
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
    <div class="wave">
        <!-- 위로 화살표 -->
        <div class="up">
            <i class="fa-regular fa-hand-point-up"></i>
        </div>
    </div>
</section>
<section class="panel" id="introSection"></section>
<section class="panel" id="teamSection"></section>
<section class="panel" id="privateSection"></section>

<?php
get_footer();
?>