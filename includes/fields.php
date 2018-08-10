<?php

	/**
	 * Share Tools Custom fields
	 *
	 * @package nbst
	 * @version 0.01
	 */

	if ( ! defined( 'ABSPATH' ) ) {
		exit; // Exit if accessed directly
	}


	/**
	 * Create the custom fields meta box
	 *
	 */
	function nbst_add_meta_box() {
		//this will add the metabox for the selected post type
		$screens = array( 'page', 'post' ); // TODO: Add CPT support

		foreach ( $screens as $screen ) {

		    add_meta_box(
		        'nbst_sectionid',
		        __( 'Mentions', 'nabi' ),
		        'nbst_metabox_callback',
		        $screen
		    );

		}
	}
	add_action( 'add_meta_boxes', 'nbst_add_meta_box' );


	/**
	 * Prints the box content.
	 *
	 * @param WP_Post $post The object for the current post/page.
	 */
	function nbst_metabox_callback( $post ) {

		// Add a nonce field so we can check for it later.
		wp_nonce_field( 'nbst_save_meta_box_data', 'nbst_meta_box_nonce' );

		/*
		 * Use get_post_meta() to retrieve an existing value
		 * from the database and use the value for the form.
		 */

		$likesnumberValue = get_post_meta( $post->ID, 'likesnumber_value_key', true );

		echo '<div class="likesCF__row">';

			// Number of likes
			echo '<div class="likesCF__col--half">';
			echo '<label for="nbst_likesnumber">' . _e( 'Nombre de mentions j’aime', 'nabi' ) . '</label> ';
			echo '<input type="text" id="nbst_likesnumber" name="nbst_likesnumber" value="' . esc_attr( $likesnumberValue ) . '" size="25" />';
			echo '</div>';

		echo '</div>';


	}


	/**
	 * When the post is saved, saves our custom data.
	 *
	 * @param int $post_id The ID of the post being saved.
	 */
	function nbst_save_meta_box_data( $post_id ) {

		if ( ! isset( $_POST['nbst_meta_box_nonce'] ) ) {
	    	return;
		}

		if ( ! wp_verify_nonce( $_POST['nbst_meta_box_nonce'], 'nbst_save_meta_box_data' ) ) {
	    	return;
		}

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
	    	return;
		}

		// Check the user's permissions.
		if ( isset( $_POST['post_type'] ) && 'page' == $_POST['post_type'] ) {

	    	if ( ! current_user_can( 'edit_page', $post_id ) ) {
				return;
	    	}

		} else {

	    	if ( ! current_user_can( 'edit_post', $post_id ) ) {
	        	return;
	    	}
		}

		// Update Post
		$likesnumberField = sanitize_text_field( $_POST['nbst_likesnumber'] );

		update_post_meta( $post_id, 'likesnumber_value_key', $likesnumberField );

	}

	add_action( 'save_post', 'nbst_save_meta_box_data' );



	/**
	 * Register Custom Fields for REST API
	 *
	 */
	add_action( 'rest_api_init', 'nbst_api_posts_meta_field' );
	function nbst_api_posts_meta_field() {

	    // register_rest_field ( 'name-of-post-type', 'name-of-field-to-return', array-of-callbacks-and-schema() )
	    register_rest_field( 'likescounter', 'post-meta-fields', array(
	           'get_callback'    => 'nbst_get_post_meta_for_api',
	           'schema'          => null,
	        )
	    );
	}

	function nbst_get_post_meta_for_api( $object ) {
	    //get the id of the post object array
	    $post_id = $object['id'];

	    //return the post meta
	    return get_post_meta( $post_id );
	}


?>
