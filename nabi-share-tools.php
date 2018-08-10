<?php
/**
* Plugin Name: Nabi Share Tools
* Plugin URI: https://agencenabi.com
* Description: Add simples sharing, print and like buttons to your pages and blog posts.
* Version: 1.0
* Author: Marc-André Lavigne
* Author URI: https://agencenabi.com
* License: GPLv2 or later
**/

function version() {
	global $version;
	$version = '1';
}

// include_once( 'includes/settings.php' );
include_once( 'includes/register.php' );
include_once( 'includes/functions.php' );
include_once( 'includes/locate-template.php' );
include_once( 'includes/shortcodes.php' );
include_once( 'includes/fields.php' );
?>