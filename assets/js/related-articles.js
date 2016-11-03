var relatedArticles = function(url){

	var slug = url;
	var tags = [];
	var related = [];
	var allRelatedArticles = [];

	var generateRelated = function(arrayOfPosts){
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    function noDups(array) {
      var newArr = [];
      var lookup = {};

      for(var i in array){
        lookup[array[i]["slug"]] = array[i];
      }

      for (i in lookup) {
        newArr.push(lookup[i]);
      }

      return newArr;
    }

    var cleanArray = noDups(arrayOfPosts);
    var shuffledPosts = shuffle(cleanArray);

		return shuffledPosts.slice(0,3);
	}

	var tagCheck = function(tag, posts){
		var taggedPosts = [];
    if(Array.isArray(tag) === false){
      for(var x = 0; x < posts.length; x++){
        var postTags = posts[x].tags
        for(var i = 0; i < postTags.length; i++){
          if(postTags[i].slug === tag){
            taggedPosts.push(posts[x]);
          }
        }
      }
    }else if(Array.isArray(tag) === true){
      for(var x = 0; x < posts.length; x++){
        var postTags = posts[x].tags;
        for (var i = 0; i < postTags.length; i++) {
          for(var y = 0; y < tag.length; y++){
            if(postTags[i].slug === tag[y].slug){
              taggedPosts.push(posts[x]);
            }
          }
        }
      }
    }
		return taggedPosts;
	}


	$.get(ghost.url.api('posts', {limit: "all",include: "tags,author"})).done(function(data){
    var allPosts = data.posts;

    if(slug.indexOf("/tag/")) {
      var tagged = slug.slice(5, -1);
      allRelatedArticles = tagCheck(tagged, allPosts);
    } else if(slug.indexOf("/author/")){
      var author = slug.slice(8, -1);
      for(var x = 0; x < allPosts.length; x++){
        console.log(allPosts[x].author);
        if(allPosts[x].author.slug === author){
          tags = allPosts[x].tags;
          allRelatedArticles = tagCheck(tags, allPosts);
        }
      }
    } else {
      var article = slug.slice(1, -1);
      for(var x = 0; x < allPosts.length; x++){
        if(allPosts[x].slug === article){
          tags = allPosts[x].tags;
          allRelatedArticles = tagCheck(tags, allPosts);
        }
      }
    }

		related = generateRelated(allRelatedArticles);
    console.log(related);
		for(var i = 0; i < related.length; i++){
			$("#related-articles-list").append('<li><a href="' + related[i].slug +'">' + related[i].title +'</a></li>');
		}

  	}).fail(function(err){
  		console.log(err);
  	});


}
