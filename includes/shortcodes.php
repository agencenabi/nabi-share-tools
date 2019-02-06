<?php
/**
 * Share Tools Shortcodes
 *
 * @package nbst
 * @version 1.2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

// Get template
function nbst_get_template( $template_name, $args = array(), $tempate_path = '', $default_path = '' ) {
	if ( is_array( $args ) && isset( $args ) ) :
		extract( $args );
	endif;
	$template_file = nbst_locate_template( $template_name, $tempate_path, $default_path );
	if ( ! file_exists( $template_file ) ) :
		_doing_it_wrong( __FUNCTION__, sprintf( '<code>%s</code> does not exist.', $template_file ), '1.0.0' );
		return;
	endif;
	include $template_file;
}


// Create the Share Shortcode
function nabi_sc_share($atts = [], $content = null, $tag = '') {

    // normalize attribute keys, lowercase
    $atts = array_change_key_case((array)$atts, CASE_LOWER);

    // override default attributes with user attributes
    $display = shortcode_atts([
        'display' => 'dropdown',
    ], $atts, $tag);

	ob_start();
	include_once('template/share.php');
	return ob_get_clean();
}
add_shortcode( 'NabiShare', 'nabi_sc_share' );


// Create the Like Shortcode
function nabi_sc_like() {
	ob_start();
	include_once('template/like.php');
	return ob_get_clean();
}
add_shortcode( 'NabiLike', 'nabi_sc_like' );

// Create the Print Shortcode
function nabi_sc_print() {
	ob_start();
	include_once('template/print.php');
	return ob_get_clean();
}
add_shortcode( 'NabiPrint', 'nabi_sc_print' );


// Create the All Tools Shortcode
function nabi_sc_sharetools() {
	ob_start();
	include_once('template/share.php');
	include_once('template/print.php');
	include_once('template/like.php');
	return ob_get_clean();
}
add_shortcode( 'NabiShareTools', 'nabi_sc_sharetools' );
