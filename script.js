var tweets = [];

function postTweet() {
    var tweetText = document.getElementById('newTweet').value;
    var tweet = {
        text: tweetText,
        comments: [],
        likes: 0,
        liked: false
    };
    tweets.push(tweet);

    displayTweets();
}

function displayTweets() {
    var tweetsDiv = document.getElementById('tweets');
    tweetsDiv.innerHTML = '';

    for (var i = 0; i < tweets.length; i++) {
        var tweetDiv = document.createElement('div');
        var tweetText = document.createElement('p');
        tweetText.textContent = tweets[i].text;
        tweetDiv.appendChild(tweetText);

        var likeButton = document.createElement('button');
        likeButton.style.background = tweets[i].liked ? 'red' : 'white';
        likeButton.textContent = 'Like';
        likeButton.onclick = (function(i) {
            return function() {
                tweets[i].likes++;
                tweets[i].liked = !tweets[i].liked;
                displayTweets();
            };
        })(i);
        tweetDiv.appendChild(likeButton);

        var commentBox = document.createElement('textarea');
        var commentButton = document.createElement('button');
        commentButton.textContent = 'Comment';
        commentButton.onclick = (function(i, commentBox) {
            return function() {
                var comment = commentBox.value;
                tweets[i].comments.push(comment);
                displayTweets();
            };
        })(i, commentBox);
        tweetDiv.appendChild(commentBox);
        tweetDiv.appendChild(commentButton);

        var commentsDiv = document.createElement('div');
        for (var j = 0; j < tweets[i].comments.length; j++) {
            var commentDiv = document.createElement('div');
            commentDiv.textContent = tweets[i].comments[j];
            commentsDiv.appendChild(commentDiv);
        }
        tweetDiv.appendChild(commentsDiv);

        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = (function(i, tweetText) {
            return function() {
                var editArea = document.createElement('textarea');
                editArea.value = tweets[i].text;
                tweetText.parentNode.replaceChild(editArea, tweetText);

                var saveButton = document.createElement('button');
                saveButton.textContent = 'Save';
                saveButton.onclick = function() {
                    tweets[i].text = editArea.value;
                    displayTweets();
                };
                tweetDiv.appendChild(saveButton);
            };
        })(i, tweetText);
        tweetDiv.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = (function(i) {
            return function() {
                tweets.splice(i, 1);
                displayTweets();
            };
        })(i);
        tweetDiv.appendChild(deleteButton);

        tweetsDiv.appendChild(tweetDiv);
    }
}