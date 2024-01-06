<?php

/*
Theme Name: Monami
Version: 1.0
*/

/**
 * 컴포넌트 - 헤더
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <?php wp_head(); ?>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="keywords" content="portfolio, front-end">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow">

    <!-- fontawesome -->
    <script src="https://kit.fontawesome.com/6788614b36.js" crossorigin="anonymous"></script>

    <!-- bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

    <?php
    // 현재 포스트의 이전 포스트에 대한 링크
    $prev_post = get_previous_post();
    if ($prev_post) {
        echo '<link rel="prev" href="' . get_permalink($prev_post->ID) . '" />';
    }

    // 현재 포스트의 다음 포스트에 대한 링크
    $next_post = get_next_post();
    if ($next_post) {
        echo '<link rel="next" href="' . get_permalink($next_post->ID) . '" />';
    }
    ?>



</head>

<body <?php body_class(); ?>>
    <header class="siteHeader" role="header">
        <div class="logo">
            <?php if (get_theme_mod('monami_logo')) : ?>
                <a href="<?php echo esc_url(home_url('/')); ?>" title="<?php echo esc_attr(get_bloginfo('name', 'display')); ?>" rel="home">
                    <img src="<?php echo esc_url(get_theme_mod('monami_logo')); ?>" alt="<?php bloginfo('name'); ?>">
                </a>
            <?php else : ?>
                <h1 class="siteTitle"><a href="<?php echo esc_url(home_url('/')); ?>" rel="home"><?php bloginfo('name'); ?></a></h1>
            <?php endif; ?>
            <!-- <div class="siteLogo" <?php echo 'onclick="location.href=\'' . home_url() . '\'"'; ?>>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="80px" height="80px" viewBox="0 0 80 80" version="1.1">
                    <g id="surface1">
                        <path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 36.703125 2.453125 C 25.859375 3.140625 16.207031 6.332031 9.976562 11.28125 C 8.992188 12.058594 7.394531 13.628906 6.675781 14.519531 C 3.890625 17.976562 2.890625 21.71875 3.785156 25.371094 C 5.257812 31.378906 11.679688 36.445312 21.296875 39.183594 C 26.03125 40.527344 31.5625 41.257812 37.105469 41.257812 L 38.6875 41.257812 L 38.652344 58.753906 C 38.621094 69.339844 38.636719 76.4375 38.675781 76.703125 C 38.75 77.179688 38.882812 77.414062 39.214844 77.660156 C 39.394531 77.800781 39.546875 77.816406 40.578125 77.84375 C 42.015625 77.875 44.769531 77.75 46.890625 77.546875 C 62.15625 76.132812 73.957031 69.882812 76.578125 61.816406 C 77 60.535156 77.074219 60.023438 77.074219 58.445312 C 77.074219 57.3125 77.042969 56.867188 76.933594 56.371094 C 76.140625 52.742188 73.742188 49.527344 69.703125 46.679688 C 68.460938 45.808594 67.273438 45.117188 65.519531 44.257812 C 60.117188 41.59375 53.667969 39.941406 46.222656 39.296875 C 45.222656 39.214844 41.6875 39.035156 40.875 39.035156 C 40.75 39.035156 40.742188 38.097656 40.726562 21.125 C 40.703125 4.296875 40.695312 3.207031 40.578125 2.984375 C 40.503906 2.859375 40.339844 2.675781 40.207031 2.578125 C 39.976562 2.414062 39.890625 2.40625 38.816406 2.398438 C 38.183594 2.394531 37.238281 2.414062 36.703125 2.453125 Z M 38.628906 22.371094 L 38.628906 38.925781 L 37.332031 38.910156 C 29.820312 38.800781 21.820312 37.058594 16.414062 34.355469 C 11.40625 31.851562 8.398438 28.792969 7.472656 25.273438 C 7.257812 24.464844 7.207031 22.917969 7.363281 22.03125 C 8.570312 15.105469 18.578125 8.859375 32.148438 6.5625 C 34.304688 6.199219 37.816406 5.769531 38.40625 5.800781 L 38.628906 5.816406 Z M 42.792969 41.59375 C 54.183594 42.910156 63.734375 46.117188 69.40625 50.503906 C 70.25 51.164062 71.6875 52.5625 72.257812 53.296875 C 73.140625 54.421875 73.71875 55.535156 74.058594 56.761719 C 74.238281 57.421875 74.238281 59.398438 74.050781 60.066406 C 72.941406 64.03125 68.421875 67.644531 61.257812 70.289062 C 56.140625 72.183594 49.800781 73.472656 42.867188 74.035156 C 42.097656 74.097656 41.304688 74.148438 41.105469 74.148438 L 40.742188 74.148438 L 40.742188 41.40625 L 40.984375 41.40625 C 41.109375 41.40625 41.933594 41.488281 42.792969 41.59375 Z M 42.792969 41.59375 " />
                    </g>
                </svg>
            </div> -->
        </div>
        <div class="menu">
            <?php wp_nav_menu(array('theme_location' => 'primary-menu', 'menu_id' => 'primary-menu')); ?>
        </div>
    </header>