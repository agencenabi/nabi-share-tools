<?php
/**
 * Share Tools register styles, scripts and Custom post
 *
 * @package nbst
 * @version 1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Enqueue admin styles and scripts
 *
 * @return void
 */
function nbst_admin_assets() {
	$version = '1';
	wp_enqueue_style( 'nbst-admin-styles', plugins_url() . '/nabi-share-tools/assets/dist/css/admin.css', array(), $version, true);
}
add_action( 'admin_enqueue_scripts', 'nbst_admin_assets' );


/**
 * Enqueue front-end scripts and styles
 *
 * @return void
 */

 add_action('wp_enqueue_scripts', 'nbst_front_assets');
function nbst_front_assets() {
    wp_register_style( 'nbst-front-styles',  plugins_url() . '/nabi-share-tools/assets/dist/css/front.min.css');
    wp_enqueue_style( 'nbst-front-styles' );
}