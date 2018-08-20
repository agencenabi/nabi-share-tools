/*
  LIKE
  ------
  Add a like button in the page. Like number is saved to the database using a custom field.
 */


;nb_like = (function($) {


	/**
	 * INITIALISE
	 * ----------
	 *
	 * @return {undefined}
	 */
	(function init() {
		nb_likeBtn();
		nb_likePlurial();
	})();


	/**
	 * LIKE BUTTON
	 * ----------
	 *
	 */
	function nb_likeBtn() {
		$('.nb__likeBtn').click(function(){

			if (window.location.href.indexOf("wordpress-sandbox") > -1) {
				var url = '/wordpress-sandbox/wp-json/nabi-share-tools/v2/likes/';
			} else {
				var url = '/wp-json/nabi-share-tools/v2/likes/';
			}

			var yetLiked = localStorage['liked'];
		    if (!yetLiked) {
			    $.ajax({
		            url: url + nbstFrontScript.post_id,
		            type: 'post',
		            success: function() {
		                console.log('works!');
		             },
		             error: function() {
		                console.log('failed!');
		              }
		          });

		        // Change the like number in the HTML to add 1
		        var updated_likes = parseInt($('.nb__likeNbr').html()) + 1;
		        $('.nb__likeNbr').html(updated_likes);

		        // Make the button disabled
		        $(this).attr('disabled', true).addClass('isDisabled');

		        // Save like action in local Storage
		        localStorage['liked-' + nbstFrontScript.post_id] = "yes";

		        // Lookup if more than 1 comment, then plurialize the like label
		        if(parseInt( $('.nb__likeNbr').text()) < 3 ) {
		        	nb_likePlurial();
		        }

	        } else {
		        // Make the button disabled by default if visitor have already liked.
		        $(this).attr('disabled', true).addClass('isDisabled');
	        }

		});

		// Disable btn when like limit (1) is reached
		if (localStorage.getItem('liked-' + nbstFrontScript.post_id ) != null) {
			$('.nb__likeBtn').attr('disabled', true).addClass('isDisabled');
		}

	}

	// Plurialize the Likes
	function nb_likePlurial() {
		if(parseInt( $('.nb__likeNbr').text()) > 1 ) {
			$('.nb__likeMention').text( $('.nb__likeMention').text() + 's' );
		}
	}


	/*
		Return public methods
	 */
	return {
		nb_likeBtn : nb_likeBtn,
		nb_likePlurial : nb_likePlurial,
	}

})(jQuery);
