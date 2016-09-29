var customTag = function(tag, widgetTitle){

	$.get(ghost.url.api('posts', {include:'tags'})).done(function(data){
		var allTaggedPosts = [];
		$('#custom-tag-header').html(widgetTitle);

		for(var i = 0; i < data.posts.length; i++){
			var tagArray = data.posts[i].tags;
			for(var x = 0; x < tagArray.length; x++){
				if(tagArray[x].name.toLowerCase() === tag.toLowerCase()){
					allTaggedPosts.push(data.posts[i]);
				}
			}
		}

		for(var y = 0; y < allTaggedPosts.length; y++){
			$("#custom-tag-line").append('<li><a class="feature-with-date" href="' + allTaggedPosts[y].slug +'"><span>' + allTaggedPosts[y].title +'</span></a></li>');
		}
		var tagUC = tag.toUpperCase();

		$('#custom-tag').append('<a class="features-footer" href="/tag/'+ tag +'">MORE ' + tagUC + '<img src="/assets/images/QP_arrow.png"/></a>');
	}).fail(function(err){
		console.log(err);
	});
};
