<?php
/**
 * Share Tools Function
 *
 * @package nbst
 * @version 1.1
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * PHP to JS
 *
 * @since nbst 1.0
 */
add_action( 'wp_enqueue_scripts', 'nbst_php_to_js' );

function nbst_php_to_js() {
	$version = 1;
	$vars = array(
		'site_url'      => home_url(),
		'template_url'  => get_template_directory_uri(),
		'site_title'    => get_bloginfo( 'name' ),
		'ajaxUrl' 		=> admin_url('admin-ajax.php'),
		'homeUrl'	 	=> home_url(),
	    'pluginsUrl' 	=> plugins_url() . '/' . plugin_basename( __FILE__ ),
		'post_id'      	=> get_the_ID(),
	);

	// Front-end Script
	wp_register_script('nbst-front-script', plugins_url() . '/nabi-share-tools/assets/dist/js/front.min.js', array('jquery'), $version, true);
    wp_enqueue_script('nbst-front-script');
	wp_localize_script('nbst-front-script', 'nbstFrontScript', $vars);

}



/**
 * Flushing Rewrite on theme switching
 *
 * @since nbst 1.0
 */
add_action( 'after_switch_theme', 'nbst_rewrite_flush' );

function nbst_rewrite_flush() {
    flush_rewrite_rules();
}


/**
 * Likes Rest API Route
 *
 * @since nbst 1.0
 */
add_action( 'rest_api_init', function () {

	register_rest_route( 'nabi-share-tools/v2', '/likes/(?P<id>\d+)', array(
    	'methods' => array('GET','POST'),
		'callback' => 'nbst__like',
	) );

});

function nbst__like( WP_REST_Request $request ) {

    // Get the current like number for the post
    $current_likes = get_post_meta($request['id'], 'likesnumber_value_key', true);
    // Add 1 to the existing number
    $updated_likes = $current_likes + 1;
    // Update the field with a new value on this post
    $likes = update_post_meta( $request['id'], 'likesnumber_value_key', $updated_likes );

    return $likes;
}
