<?php

/*
Theme Name: Monami
Version: 1.0
*/


// 초기 세팅--------------------------------------------------------

if (!function_exists('my_theme_setup')) {
    function my_theme_setup()
    {
        add_theme_support('automatic-feed-links');
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');
        add_image_size('post-thumbnail-img', 345);

        add_theme_support('html5', array(
            'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
        ));
    }
}

add_action('after_setup_theme', 'my_theme_setup');

// css, script 추가--------------------------------------------------------

function set_style_sheet()
{
    wp_enqueue_style('monami_style', get_stylesheet_directory_uri() . '/style.css');
    wp_enqueue_style('monami_style', get_stylesheet_directory_uri() . '/style_mobile.css');
};
add_action('wp_enqueue_scripts', 'set_style_sheet');

function set_scripts()
{

    // The core GSAP library
    wp_enqueue_script( 'gsap-js', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js', array(), false, true );
    // MotionPathPlugin
    wp_enqueue_script( 'gsap-mp', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/MotionPathPlugin.min.js', array('gsap-js'), false, true );

    // ScrollTrigger - with gsap.js passed as a dependency
    wp_enqueue_script( 'gsap-st', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/ScrollTrigger.min.js', array('gsap-js'), false, true );
    // Your animation code file - with gsap.js passed as a dependency
    wp_enqueue_script( 'gsap-js2', get_template_directory_uri() . '/js/animation.js', array('gsap-js','gsap-st','gsap-mp'), false, false );


};
add_action('wp_enqueue_scripts', 'set_scripts');
