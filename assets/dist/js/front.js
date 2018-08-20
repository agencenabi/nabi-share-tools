/*
	INLINE SVG
	------
	Replace images tags containing .svg with inline SVG

 */

;inlineSvg = (function($) {

	/**
	 * INITIALISE
	 * ----------
	 *
	 * @return {undefined}
	 */
	(function init() {
		inlineAllsvg();
	})();


	/**
	 * Update
	 * ----------
	 *
	 */
	function inlineAllsvg() {
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
	}

	/*
		Return public methods
	 */
	return {
		inlineAllsvg : inlineAllsvg,
	}



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
;nb_sharingTools = (function($) {

	/**
	 * Update
	 * ----------
	 *
	 */
	function update() {
		inlineSvg.inlineAllsvg();
		nb_like.nb_likeBtn();
		nb_like.nb_likePlurial();
		nb_share.nb_shareBtn();
		nb_print.nb_printBtn();
	}

	/*
		Return public methods
	 */
	return {
		update : update,
	}

})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5iLWlubGluZVN2Zy5qcyIsIm5iLWxpa2UuanMiLCJuYi1wcmludC5qcyIsIm5iLXNoYXJlLmpzIiwibmItc2hhcmluZ1Rvb2xzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZnJvbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuXHRJTkxJTkUgU1ZHXG5cdC0tLS0tLVxuXHRSZXBsYWNlIGltYWdlcyB0YWdzIGNvbnRhaW5pbmcgLnN2ZyB3aXRoIGlubGluZSBTVkdcblxuICovXG5cbjtpbmxpbmVTdmcgPSAoZnVuY3Rpb24oJCkge1xuXG5cdC8qKlxuXHQgKiBJTklUSUFMSVNFXG5cdCAqIC0tLS0tLS0tLS1cblx0ICpcblx0ICogQHJldHVybiB7dW5kZWZpbmVkfVxuXHQgKi9cblx0KGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0aW5saW5lQWxsc3ZnKCk7XG5cdH0pKCk7XG5cblxuXHQvKipcblx0ICogVXBkYXRlXG5cdCAqIC0tLS0tLS0tLS1cblx0ICpcblx0ICovXG5cdGZ1bmN0aW9uIGlubGluZUFsbHN2ZygpIHtcblx0XHRqUXVlcnkoJy5uYl9zaGFyZU92ZXIgaW1nJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdCAgICB2YXIgJGltZyA9IGpRdWVyeSh0aGlzKTtcblx0XHQgICAgdmFyIGltZ0lEID0gJGltZy5hdHRyKCdpZCcpO1xuXHRcdCAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoJ2NsYXNzJyk7XG5cdFx0ICAgIHZhciBpbWdVUkwgPSAkaW1nLmF0dHIoJ3NyYycpO1xuXG5cdFx0ICAgIGpRdWVyeS5nZXQoaW1nVVJMLCBmdW5jdGlvbihkYXRhKSB7XG5cblx0XHQgICAgICAgIC8vIEdldCB0aGUgU1ZHIHRhZywgaWdub3JlIHRoZSByZXN0XG5cdFx0ICAgICAgICB2YXIgJHN2ZyA9IGpRdWVyeShkYXRhKS5maW5kKCdzdmcnKTtcblxuXHRcdCAgICAgICAgLy8gQWRkIHJlcGxhY2VkIGltYWdlJ3MgSUQgdG8gdGhlIG5ldyBTVkdcblx0XHQgICAgICAgIGlmKHR5cGVvZiBpbWdJRCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHQgICAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKCdpZCcsIGltZ0lEKTtcblx0XHQgICAgICAgIH1cblx0XHQgICAgICAgIC8vIEFkZCByZXBsYWNlZCBpbWFnZSdzIGNsYXNzZXMgdG8gdGhlIG5ldyBTVkdcblx0XHQgICAgICAgIGlmKHR5cGVvZiBpbWdDbGFzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHQgICAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKCdjbGFzcycsIGltZ0NsYXNzKycgcmVwbGFjZWQtc3ZnJyk7XG5cdFx0ICAgICAgICB9XG5cblx0XHQgICAgICAgIC8vIFJlbW92ZSBhbnkgaW52YWxpZCBYTUwgdGFncyBhcyBwZXIgaHR0cDovL3ZhbGlkYXRvci53My5vcmdcblx0XHQgICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoJ3htbG5zOmEnKTtcblxuXHRcdCAgICAgICAgLy8gUmVwbGFjZSBpbWFnZSB3aXRoIG5ldyBTVkdcblx0XHQgICAgICAgICRpbWcucmVwbGFjZVdpdGgoJHN2Zyk7XG5cblx0XHQgICAgfSwgJ3htbCcpO1xuXG5cdFx0fSk7XG5cdH1cblxuXHQvKlxuXHRcdFJldHVybiBwdWJsaWMgbWV0aG9kc1xuXHQgKi9cblx0cmV0dXJuIHtcblx0XHRpbmxpbmVBbGxzdmcgOiBpbmxpbmVBbGxzdmcsXG5cdH1cblxuXG5cbn0pKGpRdWVyeSk7XG4iLCIvKlxuICBMSUtFXG4gIC0tLS0tLVxuICBBZGQgYSBsaWtlIGJ1dHRvbiBpbiB0aGUgcGFnZS4gTGlrZSBudW1iZXIgaXMgc2F2ZWQgdG8gdGhlIGRhdGFiYXNlIHVzaW5nIGEgY3VzdG9tIGZpZWxkLlxuICovXG5cblxuO25iX2xpa2UgPSAoZnVuY3Rpb24oJCkge1xuXG5cblx0LyoqXG5cdCAqIElOSVRJQUxJU0Vcblx0ICogLS0tLS0tLS0tLVxuXHQgKlxuXHQgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG5cdCAqL1xuXHQoZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRuYl9saWtlQnRuKCk7XG5cdFx0bmJfbGlrZVBsdXJpYWwoKTtcblx0fSkoKTtcblxuXG5cdC8qKlxuXHQgKiBMSUtFIEJVVFRPTlxuXHQgKiAtLS0tLS0tLS0tXG5cdCAqXG5cdCAqL1xuXHRmdW5jdGlvbiBuYl9saWtlQnRuKCkge1xuXHRcdCQoJy5uYl9fbGlrZUJ0bicpLmNsaWNrKGZ1bmN0aW9uKCl7XG5cblx0XHRcdGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwid29yZHByZXNzLXNhbmRib3hcIikgPiAtMSkge1xuXHRcdFx0XHR2YXIgdXJsID0gJy93b3JkcHJlc3Mtc2FuZGJveC93cC1qc29uL25hYmktc2hhcmUtdG9vbHMvdjIvbGlrZXMvJztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhciB1cmwgPSAnL3dwLWpzb24vbmFiaS1zaGFyZS10b29scy92Mi9saWtlcy8nO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgeWV0TGlrZWQgPSBsb2NhbFN0b3JhZ2VbJ2xpa2VkJ107XG5cdFx0ICAgIGlmICgheWV0TGlrZWQpIHtcblx0XHRcdCAgICAkLmFqYXgoe1xuXHRcdCAgICAgICAgICAgIHVybDogdXJsICsgbmJzdEZyb250U2NyaXB0LnBvc3RfaWQsXG5cdFx0ICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuXHRcdCAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuXHRcdCAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnd29ya3MhJyk7XG5cdFx0ICAgICAgICAgICAgIH0sXG5cdFx0ICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbigpIHtcblx0XHQgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWxlZCEnKTtcblx0XHQgICAgICAgICAgICAgIH1cblx0XHQgICAgICAgICAgfSk7XG5cblx0XHQgICAgICAgIC8vIENoYW5nZSB0aGUgbGlrZSBudW1iZXIgaW4gdGhlIEhUTUwgdG8gYWRkIDFcblx0XHQgICAgICAgIHZhciB1cGRhdGVkX2xpa2VzID0gcGFyc2VJbnQoJCgnLm5iX19saWtlTmJyJykuaHRtbCgpKSArIDE7XG5cdFx0ICAgICAgICAkKCcubmJfX2xpa2VOYnInKS5odG1sKHVwZGF0ZWRfbGlrZXMpO1xuXG5cdFx0ICAgICAgICAvLyBNYWtlIHRoZSBidXR0b24gZGlzYWJsZWRcblx0XHQgICAgICAgICQodGhpcykuYXR0cignZGlzYWJsZWQnLCB0cnVlKS5hZGRDbGFzcygnaXNEaXNhYmxlZCcpO1xuXG5cdFx0ICAgICAgICAvLyBTYXZlIGxpa2UgYWN0aW9uIGluIGxvY2FsIFN0b3JhZ2Vcblx0XHQgICAgICAgIGxvY2FsU3RvcmFnZVsnbGlrZWQtJyArIG5ic3RGcm9udFNjcmlwdC5wb3N0X2lkXSA9IFwieWVzXCI7XG5cblx0XHQgICAgICAgIC8vIExvb2t1cCBpZiBtb3JlIHRoYW4gMSBjb21tZW50LCB0aGVuIHBsdXJpYWxpemUgdGhlIGxpa2UgbGFiZWxcblx0XHQgICAgICAgIGlmKHBhcnNlSW50KCAkKCcubmJfX2xpa2VOYnInKS50ZXh0KCkpIDwgMyApIHtcblx0XHQgICAgICAgIFx0bmJfbGlrZVBsdXJpYWwoKTtcblx0XHQgICAgICAgIH1cblxuXHQgICAgICAgIH0gZWxzZSB7XG5cdFx0ICAgICAgICAvLyBNYWtlIHRoZSBidXR0b24gZGlzYWJsZWQgYnkgZGVmYXVsdCBpZiB2aXNpdG9yIGhhdmUgYWxyZWFkeSBsaWtlZC5cblx0XHQgICAgICAgICQodGhpcykuYXR0cignZGlzYWJsZWQnLCB0cnVlKS5hZGRDbGFzcygnaXNEaXNhYmxlZCcpO1xuXHQgICAgICAgIH1cblxuXHRcdH0pO1xuXG5cdFx0Ly8gRGlzYWJsZSBidG4gd2hlbiBsaWtlIGxpbWl0ICgxKSBpcyByZWFjaGVkXG5cdFx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaWtlZC0nICsgbmJzdEZyb250U2NyaXB0LnBvc3RfaWQgKSAhPSBudWxsKSB7XG5cdFx0XHQkKCcubmJfX2xpa2VCdG4nKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpLmFkZENsYXNzKCdpc0Rpc2FibGVkJyk7XG5cdFx0fVxuXG5cdH1cblxuXHQvLyBQbHVyaWFsaXplIHRoZSBMaWtlc1xuXHRmdW5jdGlvbiBuYl9saWtlUGx1cmlhbCgpIHtcblx0XHRpZihwYXJzZUludCggJCgnLm5iX19saWtlTmJyJykudGV4dCgpKSA+IDEgKSB7XG5cdFx0XHQkKCcubmJfX2xpa2VNZW50aW9uJykudGV4dCggJCgnLm5iX19saWtlTWVudGlvbicpLnRleHQoKSArICdzJyApO1xuXHRcdH1cblx0fVxuXG5cblx0Lypcblx0XHRSZXR1cm4gcHVibGljIG1ldGhvZHNcblx0ICovXG5cdHJldHVybiB7XG5cdFx0bmJfbGlrZUJ0biA6IG5iX2xpa2VCdG4sXG5cdFx0bmJfbGlrZVBsdXJpYWwgOiBuYl9saWtlUGx1cmlhbCxcblx0fVxuXG59KShqUXVlcnkpO1xuIiwiLypcbiAgUFJJTlRcbiAgLS0tLS0tXG4gIFByaW50IHRoZSBwYWdlIG9uIHRoZSBidXR0b24gY2xpY2tcbiAqL1xuXG5cbjtuYl9wcmludCA9IChmdW5jdGlvbigkKSB7XG5cblxuXHQvKipcblx0ICogSU5JVElBTElTRVxuXHQgKiAtLS0tLS0tLS0tXG5cdCAqXG5cdCAqIEByZXR1cm4ge3VuZGVmaW5lZH1cblx0ICovXG5cdChmdW5jdGlvbiBpbml0KCkge1xuXHRcdG5iX3ByaW50QnRuKCk7XG5cdH0pKCk7XG5cblxuXHQvKipcblx0ICogUFJJTlQgQlVUVE9OXG5cdCAqIC0tLS0tLS0tLS1cblx0ICpcblx0ICovXG5cdGZ1bmN0aW9uIG5iX3ByaW50QnRuKCkge1xuXHRcdCQoJyNuYlByaW50JykuY2xpY2soZnVuY3Rpb24oKXtcblx0XHQgICAgIHdpbmRvdy5wcmludCgpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKlxuXHRcdFJldHVybiBwdWJsaWMgbWV0aG9kc1xuXHQgKi9cblx0cmV0dXJuIHtcblx0XHRuYl9wcmludEJ0biA6IG5iX3ByaW50QnRuLFxuXHR9XG5cbn0pKGpRdWVyeSk7XG4iLCI7bmJfc2hhcmUgPSAoZnVuY3Rpb24oJCkge1xuXG5cblx0LyoqXG5cdCAqIElOSVRJQUxJU0Vcblx0ICogLS0tLS0tLS0tLVxuXHQgKlxuXHQgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG5cdCAqL1xuXHQoZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRuYl9zaGFyZUJ0bigpO1xuXHR9KSgpO1xuXG5cblx0LyoqXG5cdCAqIFNIQVJFIEJVVFRPTlxuXHQgKiAtLS0tLS0tLS0tXG5cdCAqXG5cdCAqL1xuXHRmdW5jdGlvbiBuYl9zaGFyZUJ0bigpIHtcblxuXHRcdFNoYXJlPXtcblx0XHRcdC8vIEZhY2Vib29rIFNoYXJlXG4vKlxuXHRcdFx0ZmFjZWJvb2s6ZnVuY3Rpb24ocHVybCxwdGl0bGUscGltZyx0ZXh0KSB7XG5cdFx0XHRcdHVybD0naHR0cDovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyLnBocD9zPTEwMCc7XG5cdFx0XHRcdHVybCs9JyZwW3RpdGxlXT0nK2VuY29kZVVSSUNvbXBvbmVudChwdGl0bGUpO1xuXHRcdFx0XHR1cmwrPScmcFtzdW1tYXJ5XT0nK2VuY29kZVVSSUNvbXBvbmVudCh0ZXh0KTtcblx0XHRcdFx0dXJsKz0nJnBbdXJsXT0nK2VuY29kZVVSSUNvbXBvbmVudChwdXJsKTtcblx0XHRcdFx0U2hhcmUucG9wdXAodXJsKTtcblx0XHRcdH0sXG4qL1xuXHRcdFx0Ly8gVHdpdHRlciBTaGFyZVxuXHRcdFx0dHdpdHRlcjpmdW5jdGlvbihwdXJsLHB0aXRsZSl7XG5cdFx0XHRcdHVybD0naHR0cDovL3R3aXR0ZXIuY29tL3NoYXJlPyc7XG5cdFx0XHRcdHVybCs9J3RleHQ9JytlbmNvZGVVUklDb21wb25lbnQocHRpdGxlKTtcblx0XHRcdFx0dXJsKz0nJnVybD0nK2VuY29kZVVSSUNvbXBvbmVudChwdXJsKTtcblx0XHRcdFx0dXJsKz0nJmNvdW50dXJsPScrZW5jb2RlVVJJQ29tcG9uZW50KHB1cmwpO1xuXHRcdFx0XHRTaGFyZS5wb3B1cCh1cmwpO1xuXHRcdFx0fSxcblx0XHRcdC8vIExpbmtlZGluIFNoYXJlXG5cdFx0XHRsaW5rZWRpbjpmdW5jdGlvbihwdXJsLHB0aXRsZSl7XG5cdFx0XHRcdHVybD0naHR0cDovL3d3dy5saW5rZWRpbi5jb20vc2hhcmVBcnRpY2xlP21pbmk9dHJ1ZSc7XG5cdFx0XHRcdHVybCs9J3RleHQ9JytlbmNvZGVVUklDb21wb25lbnQocHRpdGxlKTtcblx0XHRcdFx0dXJsKz0nJnVybD0nK2VuY29kZVVSSUNvbXBvbmVudChwdXJsKTtcblx0XHRcdFx0dXJsKz0nJmNvdW50dXJsPScrZW5jb2RlVVJJQ29tcG9uZW50KHB1cmwpO1xuXHRcdFx0XHRTaGFyZS5wb3B1cCh1cmwpO1xuXHRcdFx0fSxcblx0XHRcdC8vIFNoYXJlIHBvcHVwXG5cdFx0XHQvLyBjYW4gYmUgdXNlZCBmb3Igb3RoZXIgc29jaWFsIHNoYXJpbmcsIGxpa2UgRysgaW4gdGhpcyBleGVtcGxlLlxuXHRcdFx0cG9wdXA6ZnVuY3Rpb24odXJsKXtcblx0XHRcdFx0d2luZG93Lm9wZW4odXJsLCcnLCd0b29sYmFyPTAsc3RhdHVzPTAsd2lkdGg9NjI2LCBoZWlnaHQ9NDM2Jyk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vIE9uIEhvdmVyXG5cdFx0JCgnLm5iX19zaGFyZUJ0bicpLm1vdXNlZW50ZXIoIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCgnLm5iX3NoYXJlT3ZlcicpLmZhZGVJbigpO1xuXHRcdH0pO1xuXG5cdFx0JCgnLm5iX19zaGFyZUJ0bicpLm1vdXNlbGVhdmUoIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCgnLm5iX3NoYXJlT3ZlcicpLmZhZGVPdXQoKTtcblx0XHR9KTtcblxuXHR9XG5cblx0Lypcblx0XHRSZXR1cm4gcHVibGljIG1ldGhvZHNcblx0ICovXG5cdHJldHVybiB7XG5cdFx0bmJfc2hhcmVCdG4gOiBuYl9zaGFyZUJ0bixcblx0fVxuXG59KShqUXVlcnkpOyIsIjtuYl9zaGFyaW5nVG9vbHMgPSAoZnVuY3Rpb24oJCkge1xuXG5cdC8qKlxuXHQgKiBVcGRhdGVcblx0ICogLS0tLS0tLS0tLVxuXHQgKlxuXHQgKi9cblx0ZnVuY3Rpb24gdXBkYXRlKCkge1xuXHRcdGlubGluZVN2Zy5pbmxpbmVBbGxzdmcoKTtcblx0XHRuYl9saWtlLm5iX2xpa2VCdG4oKTtcblx0XHRuYl9saWtlLm5iX2xpa2VQbHVyaWFsKCk7XG5cdFx0bmJfc2hhcmUubmJfc2hhcmVCdG4oKTtcblx0XHRuYl9wcmludC5uYl9wcmludEJ0bigpO1xuXHR9XG5cblx0Lypcblx0XHRSZXR1cm4gcHVibGljIG1ldGhvZHNcblx0ICovXG5cdHJldHVybiB7XG5cdFx0dXBkYXRlIDogdXBkYXRlLFxuXHR9XG5cbn0pKGpRdWVyeSk7Il19
