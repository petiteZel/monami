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
    // ScrollToPlugin
    wp_enqueue_script( 'gsap-sp', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/ScrollToPlugin.min.js', array('gsap-js'), false, true );
    // ScrollTrigger - with gsap.js passed as a dependency
    wp_enqueue_script( 'gsap-st', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/ScrollTrigger.min.js', array('gsap-js'), false, true );
    // Your animation code file - with gsap.js passed as a dependency
    wp_enqueue_script( 'gsap-js2', get_template_directory_uri() . '/js/animation.js', array('gsap-js','gsap-st','gsap-sp','gsap-mp'), false, false );


};
add_action('wp_enqueue_scripts', 'set_scripts');

// 메뉴
function custom_menu()
{
    register_nav_menus(
        array(
            'primary-menu'   => __('Primary Menu', 'monami'),
        )
    );
}
add_action('init', 'custom_menu');


// 로고
function monami_customize_register( $wp_customize ) {
    // 로고 설정 추가
    $wp_customize->add_setting('monami_logo', array(
        'default' => '',
        'transport' => 'refresh',
    ));

    // 로고 컨트롤 추가
    $wp_customize->add_control(new WP_Customize_Image_Control(
        $wp_customize,
        'monami_logo',
        array(
            'label' => __('Header Logo', 'monami'),
            'section' => 'title_tagline', // 기본 제목 및 태그라인 섹션에 추가
            'settings' => 'monami_logo',
        )
    ));
}

add_action('customize_register', 'monami_customize_register');

// page 요약문
add_post_type_support( 'page', 'excerpt' );
