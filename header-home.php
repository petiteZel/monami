<?php

/*
Theme Name: Monami
Version: 1.1
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
        <div class="headerContainer">
            <div class="logo">
                <?php if (get_theme_mod('monami_logo')) : ?>
                    <a href="<?php echo esc_url(home_url('/')); ?>" title="<?php echo esc_attr(get_bloginfo('name', 'display')); ?>" rel="home">
                        <img src="<?php echo esc_url(get_theme_mod('monami_logo')); ?>" alt="<?php bloginfo('name'); ?>">
                    </a>
                <?php else : ?>
                    <h1 class="siteTitle"><a href="<?php echo esc_url(home_url('/')); ?>" rel="home"><?php bloginfo('name'); ?></a></h1>
                <?php endif; ?>
    
            </div>
            <div class="menu">
                <?php wp_nav_menu(array('theme_location' => 'primary-menu', 'menu_id' => 'primary-menu')); ?>
            </div>
        </div>
    </header>