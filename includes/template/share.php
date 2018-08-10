<?php
/**
 * The template for displaying the Share Button
 *
 * @package WordPress
 * @subpackage nbst
 * @since nbst 1.0
 */
 $post = get_post();
 $pageUrl = 'https://' . $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
 $pageTitle = get_the_title();
 $pageDescription = "";
 $pageThumbnail = get_the_post_thumbnail_url($post->ID, 'full');

?>

<div class="nb__shareBtn">
	<img src="<?php echo plugins_url(); ?>/nabi-share-tools/assets/dist/img/share-icon.svg" alt="<?php _e('Partager cette page', 'nabi'); ?>" />
	<span class="nb__shareLabel"><?php _e('Partager', 'nabi'); ?></span>
	<div class="nb_shareOver">

		<!-- Facebook -->
		<a onclick="Share.popup('https://www.facebook.com/sharer/sharer.php?u=<?php echo $pageUrl; ?>')">
			<div class="facebook_share">
				<img src="<?php echo plugins_url(); ?>/nabi-share-tools/assets/dist/img/facebook.svg" alt="<?php _e( 'Partager sur', 'nabi' ); ?> Facebook">
			</div>
		</a>

		<!-- Twitter -->
		<a onclick="Share.twitter(
			'<?php $url= the_permalink(); echo $url; ?>',
			'<?php the_title(); ?> '
			)">
			<div class="twitter_share">
				<img src="<?php echo plugins_url(); ?>/nabi-share-tools/assets/dist/img/twitter.svg" alt="<?php _e( 'Partager sur', 'nabi' ); ?> Twitter">
			</div>
		</a>

		<!-- LinkedIn -->
		<a onclick="Share.linkedin(
			'<?php echo $pageUrl; ?>',
			'<?php bloginfo('name'); ?>'
		)">
			<div class="linkedin_share">
				<img src="<?php echo plugins_url(); ?>/nabi-share-tools/assets/dist/img/linkedin.svg" alt="<?php _e( 'Partager sur', 'nabi' ); ?> Linkedin">
			</div>
		</a>

		<!-- Google+ -->
		<a onclick="Share.popup('https://plus.google.com/share?url=<?php echo $pageUrl; ?>', '<?php bloginfo('name'); ?>')">
			<div class="google_share">
				<img src="<?php echo plugins_url(); ?>/nabi-share-tools/assets/dist/img/googleplus.svg" alt="<?php _e( 'Partager sur', 'nabi' ); ?> Google+">
			</div>
		</a>

		<!-- Pinterest -->
		<a onclick="Share.popup('http://pinterest.com/pin/create/link/?url=<?php echo $pageUrl; ?>&media=<?php echo $pageThumbnail; ?>&description=<?php echo $pageDescription; ?>')">
			<div class="pinterest_share">
				<img src="<?php echo plugins_url(); ?>/nabi-share-tools/assets/dist/img/pinterest.svg" alt="<?php _e( 'Partager sur', 'nabi' ); ?> Pinterest">
			</div>
		</a>

	</div>

</div>