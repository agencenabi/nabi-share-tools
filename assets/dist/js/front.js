/*
	INLINE SVG
	------
	Replace images tags containing .svg with inline SVG

 */

;inlineSvg = (function($) {

	jQuery('.nb_shareOver img').each(function(){
	    var $img = jQuery(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');

	    jQuery.get(imgURL, function(data) {

	        // Get the SVG tag, ignore the rest
	        var $svg = jQuery(data).find('svg');

	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }

	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');

	        // Replace image with new SVG
	        $img.replaceWith($svg);

	    }, 'xml');

	});

})(jQuery);

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

			var yetLiked = localStorage['liked'];
		    if (!yetLiked) {
			    $.ajax({
		            url: '/wp-json/nabi-share-tools/v2/likes/' + nbstFrontScript.post_id,
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
		        localStorage['liked'] = "yes";

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
		if (localStorage.getItem("liked") != null) {
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
	}

})(jQuery);

/*
  PRINT
  ------
  Print the page on the button click
 */


;nb_print = (function($) {


	/**
	 * INITIALISE
	 * ----------
	 *
	 * @return {undefined}
	 */
	(function init() {
		nb_printBtn();
	})();


	/**
	 * PRINT BUTTON
	 * ----------
	 *
	 */
	function nb_printBtn() {
		$('#nbPrint').click(function(){
		     window.print();
		});
	}


	/*
		Return public methods
	 */
	return {
		nb_printBtn : nb_printBtn,
	}

})(jQuery);

;nb_share = (function($) {


	/**
	 * INITIALISE
	 * ----------
	 *
	 * @return {undefined}
	 */
	(function init() {
		nb_shareBtn();
	})();


	/**
	 * SHARE BUTTON
	 * ----------
	 *
	 */
	function nb_shareBtn() {

		Share={
			// Facebook Share
/*
			facebook:function(purl,ptitle,pimg,text) {
				url='http://www.facebook.com/sharer.php?s=100';
				url+='&p[title]='+encodeURIComponent(ptitle);
				url+='&p[summary]='+encodeURIComponent(text);
				url+='&p[url]='+encodeURIComponent(purl);
				Share.popup(url);
			},
*/
			// Twitter Share
			twitter:function(purl,ptitle){
				url='http://twitter.com/share?';
				url+='text='+encodeURIComponent(ptitle);
				url+='&url='+encodeURIComponent(purl);
				url+='&counturl='+encodeURIComponent(purl);
				Share.popup(url);
			},
			// Linkedin Share
			linkedin:function(purl,ptitle){
				url='http://www.linkedin.com/shareArticle?mini=true';
				url+='text='+encodeURIComponent(ptitle);
				url+='&url='+encodeURIComponent(purl);
				url+='&counturl='+encodeURIComponent(purl);
				Share.popup(url);
			},
			// Share popup
			// can be used for other social sharing, like G+ in this exemple.
			popup:function(url){
				window.open(url,'','toolbar=0,status=0,width=626, height=436');
			}
		};

		// On Hover
		$('.nb__shareBtn').mouseenter( function() {
			$('.nb_shareOver').fadeIn();
		});

		$('.nb__shareBtn').mouseleave( function() {
			$('.nb_shareOver').fadeOut();
		});

	}

	/*
		Return public methods
	 */
	return {
		nb_shareBtn : nb_shareBtn,
	}

})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5iLWlubGluZVN2Zy5qcyIsIm5iLWxpa2UuanMiLCJuYi1wcmludC5qcyIsIm5iLXNoYXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJmcm9udC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5cdElOTElORSBTVkdcblx0LS0tLS0tXG5cdFJlcGxhY2UgaW1hZ2VzIHRhZ3MgY29udGFpbmluZyAuc3ZnIHdpdGggaW5saW5lIFNWR1xuXG4gKi9cblxuO2lubGluZVN2ZyA9IChmdW5jdGlvbigkKSB7XG5cblx0alF1ZXJ5KCcubmJfc2hhcmVPdmVyIGltZycpLmVhY2goZnVuY3Rpb24oKXtcblx0ICAgIHZhciAkaW1nID0galF1ZXJ5KHRoaXMpO1xuXHQgICAgdmFyIGltZ0lEID0gJGltZy5hdHRyKCdpZCcpO1xuXHQgICAgdmFyIGltZ0NsYXNzID0gJGltZy5hdHRyKCdjbGFzcycpO1xuXHQgICAgdmFyIGltZ1VSTCA9ICRpbWcuYXR0cignc3JjJyk7XG5cblx0ICAgIGpRdWVyeS5nZXQoaW1nVVJMLCBmdW5jdGlvbihkYXRhKSB7XG5cblx0ICAgICAgICAvLyBHZXQgdGhlIFNWRyB0YWcsIGlnbm9yZSB0aGUgcmVzdFxuXHQgICAgICAgIHZhciAkc3ZnID0galF1ZXJ5KGRhdGEpLmZpbmQoJ3N2ZycpO1xuXG5cdCAgICAgICAgLy8gQWRkIHJlcGxhY2VkIGltYWdlJ3MgSUQgdG8gdGhlIG5ldyBTVkdcblx0ICAgICAgICBpZih0eXBlb2YgaW1nSUQgIT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICAvLyBBZGQgcmVwbGFjZWQgaW1hZ2UncyBjbGFzc2VzIHRvIHRoZSBuZXcgU1ZHXG5cdCAgICAgICAgaWYodHlwZW9mIGltZ0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xuXHQgICAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKCdjbGFzcycsIGltZ0NsYXNzKycgcmVwbGFjZWQtc3ZnJyk7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gUmVtb3ZlIGFueSBpbnZhbGlkIFhNTCB0YWdzIGFzIHBlciBodHRwOi8vdmFsaWRhdG9yLnczLm9yZ1xuXHQgICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoJ3htbG5zOmEnKTtcblxuXHQgICAgICAgIC8vIFJlcGxhY2UgaW1hZ2Ugd2l0aCBuZXcgU1ZHXG5cdCAgICAgICAgJGltZy5yZXBsYWNlV2l0aCgkc3ZnKTtcblxuXHQgICAgfSwgJ3htbCcpO1xuXG5cdH0pO1xuXG59KShqUXVlcnkpO1xuIiwiLypcbiAgTElLRVxuICAtLS0tLS1cbiAgQWRkIGEgbGlrZSBidXR0b24gaW4gdGhlIHBhZ2UuIExpa2UgbnVtYmVyIGlzIHNhdmVkIHRvIHRoZSBkYXRhYmFzZSB1c2luZyBhIGN1c3RvbSBmaWVsZC5cbiAqL1xuXG5cbjtuYl9saWtlID0gKGZ1bmN0aW9uKCQpIHtcblxuXG5cdC8qKlxuXHQgKiBJTklUSUFMSVNFXG5cdCAqIC0tLS0tLS0tLS1cblx0ICpcblx0ICogQHJldHVybiB7dW5kZWZpbmVkfVxuXHQgKi9cblx0KGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0bmJfbGlrZUJ0bigpO1xuXHRcdG5iX2xpa2VQbHVyaWFsKCk7XG5cdH0pKCk7XG5cblxuXHQvKipcblx0ICogTElLRSBCVVRUT05cblx0ICogLS0tLS0tLS0tLVxuXHQgKlxuXHQgKi9cblx0ZnVuY3Rpb24gbmJfbGlrZUJ0bigpIHtcblx0XHQkKCcubmJfX2xpa2VCdG4nKS5jbGljayhmdW5jdGlvbigpe1xuXG5cdFx0XHR2YXIgeWV0TGlrZWQgPSBsb2NhbFN0b3JhZ2VbJ2xpa2VkJ107XG5cdFx0ICAgIGlmICgheWV0TGlrZWQpIHtcblx0XHRcdCAgICAkLmFqYXgoe1xuXHRcdCAgICAgICAgICAgIHVybDogJy93cC1qc29uL25hYmktc2hhcmUtdG9vbHMvdjIvbGlrZXMvJyArIG5ic3RGcm9udFNjcmlwdC5wb3N0X2lkLFxuXHRcdCAgICAgICAgICAgIHR5cGU6ICdwb3N0Jyxcblx0XHQgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHtcblx0XHQgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3dvcmtzIScpO1xuXHRcdCAgICAgICAgICAgICB9LFxuXHRcdCAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7XG5cdFx0ICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmYWlsZWQhJyk7XG5cdFx0ICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgIH0pO1xuXG5cdFx0ICAgICAgICAvLyBDaGFuZ2UgdGhlIGxpa2UgbnVtYmVyIGluIHRoZSBIVE1MIHRvIGFkZCAxXG5cdFx0ICAgICAgICB2YXIgdXBkYXRlZF9saWtlcyA9IHBhcnNlSW50KCQoJy5uYl9fbGlrZU5icicpLmh0bWwoKSkgKyAxO1xuXHRcdCAgICAgICAgJCgnLm5iX19saWtlTmJyJykuaHRtbCh1cGRhdGVkX2xpa2VzKTtcblxuXHRcdCAgICAgICAgLy8gTWFrZSB0aGUgYnV0dG9uIGRpc2FibGVkXG5cdFx0ICAgICAgICAkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSkuYWRkQ2xhc3MoJ2lzRGlzYWJsZWQnKTtcblxuXHRcdCAgICAgICAgLy8gU2F2ZSBsaWtlIGFjdGlvbiBpbiBsb2NhbCBTdG9yYWdlXG5cdFx0ICAgICAgICBsb2NhbFN0b3JhZ2VbJ2xpa2VkJ10gPSBcInllc1wiO1xuXG5cdFx0ICAgICAgICAvLyBMb29rdXAgaWYgbW9yZSB0aGFuIDEgY29tbWVudCwgdGhlbiBwbHVyaWFsaXplIHRoZSBsaWtlIGxhYmVsXG5cdFx0ICAgICAgICBpZihwYXJzZUludCggJCgnLm5iX19saWtlTmJyJykudGV4dCgpKSA8IDMgKSB7XG5cdFx0ICAgICAgICBcdG5iX2xpa2VQbHVyaWFsKCk7XG5cdFx0ICAgICAgICB9XG5cblx0ICAgICAgICB9IGVsc2Uge1xuXHRcdCAgICAgICAgLy8gTWFrZSB0aGUgYnV0dG9uIGRpc2FibGVkIGJ5IGRlZmF1bHQgaWYgdmlzaXRvciBoYXZlIGFscmVhZHkgbGlrZWQuXG5cdFx0ICAgICAgICAkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSkuYWRkQ2xhc3MoJ2lzRGlzYWJsZWQnKTtcblx0ICAgICAgICB9XG5cblx0XHR9KTtcblxuXHRcdC8vIERpc2FibGUgYnRuIHdoZW4gbGlrZSBsaW1pdCAoMSkgaXMgcmVhY2hlZFxuXHRcdGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxpa2VkXCIpICE9IG51bGwpIHtcblx0XHRcdCQoJy5uYl9fbGlrZUJ0bicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSkuYWRkQ2xhc3MoJ2lzRGlzYWJsZWQnKTtcblx0XHR9XG5cblx0fVxuXG5cdC8vIFBsdXJpYWxpemUgdGhlIExpa2VzXG5cdGZ1bmN0aW9uIG5iX2xpa2VQbHVyaWFsKCkge1xuXHRcdGlmKHBhcnNlSW50KCAkKCcubmJfX2xpa2VOYnInKS50ZXh0KCkpID4gMSApIHtcblx0XHRcdCQoJy5uYl9fbGlrZU1lbnRpb24nKS50ZXh0KCAkKCcubmJfX2xpa2VNZW50aW9uJykudGV4dCgpICsgJ3MnICk7XG5cdFx0fVxuXHR9XG5cblxuXHQvKlxuXHRcdFJldHVybiBwdWJsaWMgbWV0aG9kc1xuXHQgKi9cblx0cmV0dXJuIHtcblx0XHRuYl9saWtlQnRuIDogbmJfbGlrZUJ0bixcblx0fVxuXG59KShqUXVlcnkpO1xuIiwiLypcbiAgUFJJTlRcbiAgLS0tLS0tXG4gIFByaW50IHRoZSBwYWdlIG9uIHRoZSBidXR0b24gY2xpY2tcbiAqL1xuXG5cbjtuYl9wcmludCA9IChmdW5jdGlvbigkKSB7XG5cblxuXHQvKipcblx0ICogSU5JVElBTElTRVxuXHQgKiAtLS0tLS0tLS0tXG5cdCAqXG5cdCAqIEByZXR1cm4ge3VuZGVmaW5lZH1cblx0ICovXG5cdChmdW5jdGlvbiBpbml0KCkge1xuXHRcdG5iX3ByaW50QnRuKCk7XG5cdH0pKCk7XG5cblxuXHQvKipcblx0ICogUFJJTlQgQlVUVE9OXG5cdCAqIC0tLS0tLS0tLS1cblx0ICpcblx0ICovXG5cdGZ1bmN0aW9uIG5iX3ByaW50QnRuKCkge1xuXHRcdCQoJyNuYlByaW50JykuY2xpY2soZnVuY3Rpb24oKXtcblx0XHQgICAgIHdpbmRvdy5wcmludCgpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKlxuXHRcdFJldHVybiBwdWJsaWMgbWV0aG9kc1xuXHQgKi9cblx0cmV0dXJuIHtcblx0XHRuYl9wcmludEJ0biA6IG5iX3ByaW50QnRuLFxuXHR9XG5cbn0pKGpRdWVyeSk7XG4iLCI7bmJfc2hhcmUgPSAoZnVuY3Rpb24oJCkge1xuXG5cblx0LyoqXG5cdCAqIElOSVRJQUxJU0Vcblx0ICogLS0tLS0tLS0tLVxuXHQgKlxuXHQgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG5cdCAqL1xuXHQoZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRuYl9zaGFyZUJ0bigpO1xuXHR9KSgpO1xuXG5cblx0LyoqXG5cdCAqIFNIQVJFIEJVVFRPTlxuXHQgKiAtLS0tLS0tLS0tXG5cdCAqXG5cdCAqL1xuXHRmdW5jdGlvbiBuYl9zaGFyZUJ0bigpIHtcblxuXHRcdFNoYXJlPXtcblx0XHRcdC8vIEZhY2Vib29rIFNoYXJlXG4vKlxuXHRcdFx0ZmFjZWJvb2s6ZnVuY3Rpb24ocHVybCxwdGl0bGUscGltZyx0ZXh0KSB7XG5cdFx0XHRcdHVybD0naHR0cDovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyLnBocD9zPTEwMCc7XG5cdFx0XHRcdHVybCs9JyZwW3RpdGxlXT0nK2VuY29kZVVSSUNvbXBvbmVudChwdGl0bGUpO1xuXHRcdFx0XHR1cmwrPScmcFtzdW1tYXJ5XT0nK2VuY29kZVVSSUNvbXBvbmVudCh0ZXh0KTtcblx0XHRcdFx0dXJsKz0nJnBbdXJsXT0nK2VuY29kZVVSSUNvbXBvbmVudChwdXJsKTtcblx0XHRcdFx0U2hhcmUucG9wdXAodXJsKTtcblx0XHRcdH0sXG4qL1xuXHRcdFx0Ly8gVHdpdHRlciBTaGFyZVxuXHRcdFx0dHdpdHRlcjpmdW5jdGlvbihwdXJsLHB0aXRsZSl7XG5cdFx0XHRcdHVybD0naHR0cDovL3R3aXR0ZXIuY29tL3NoYXJlPyc7XG5cdFx0XHRcdHVybCs9J3RleHQ9JytlbmNvZGVVUklDb21wb25lbnQocHRpdGxlKTtcblx0XHRcdFx0dXJsKz0nJnVybD0nK2VuY29kZVVSSUNvbXBvbmVudChwdXJsKTtcblx0XHRcdFx0dXJsKz0nJmNvdW50dXJsPScrZW5jb2RlVVJJQ29tcG9uZW50KHB1cmwpO1xuXHRcdFx0XHRTaGFyZS5wb3B1cCh1cmwpO1xuXHRcdFx0fSxcblx0XHRcdC8vIExpbmtlZGluIFNoYXJlXG5cdFx0XHRsaW5rZWRpbjpmdW5jdGlvbihwdXJsLHB0aXRsZSl7XG5cdFx0XHRcdHVybD0naHR0cDovL3d3dy5saW5rZWRpbi5jb20vc2hhcmVBcnRpY2xlP21pbmk9dHJ1ZSc7XG5cdFx0XHRcdHVybCs9J3RleHQ9JytlbmNvZGVVUklDb21wb25lbnQocHRpdGxlKTtcblx0XHRcdFx0dXJsKz0nJnVybD0nK2VuY29kZVVSSUNvbXBvbmVudChwdXJsKTtcblx0XHRcdFx0dXJsKz0nJmNvdW50dXJsPScrZW5jb2RlVVJJQ29tcG9uZW50KHB1cmwpO1xuXHRcdFx0XHRTaGFyZS5wb3B1cCh1cmwpO1xuXHRcdFx0fSxcblx0XHRcdC8vIFNoYXJlIHBvcHVwXG5cdFx0XHQvLyBjYW4gYmUgdXNlZCBmb3Igb3RoZXIgc29jaWFsIHNoYXJpbmcsIGxpa2UgRysgaW4gdGhpcyBleGVtcGxlLlxuXHRcdFx0cG9wdXA6ZnVuY3Rpb24odXJsKXtcblx0XHRcdFx0d2luZG93Lm9wZW4odXJsLCcnLCd0b29sYmFyPTAsc3RhdHVzPTAsd2lkdGg9NjI2LCBoZWlnaHQ9NDM2Jyk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vIE9uIEhvdmVyXG5cdFx0JCgnLm5iX19zaGFyZUJ0bicpLm1vdXNlZW50ZXIoIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCgnLm5iX3NoYXJlT3ZlcicpLmZhZGVJbigpO1xuXHRcdH0pO1xuXG5cdFx0JCgnLm5iX19zaGFyZUJ0bicpLm1vdXNlbGVhdmUoIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCgnLm5iX3NoYXJlT3ZlcicpLmZhZGVPdXQoKTtcblx0XHR9KTtcblxuXHR9XG5cblx0Lypcblx0XHRSZXR1cm4gcHVibGljIG1ldGhvZHNcblx0ICovXG5cdHJldHVybiB7XG5cdFx0bmJfc2hhcmVCdG4gOiBuYl9zaGFyZUJ0bixcblx0fVxuXG59KShqUXVlcnkpOyJdfQ==
