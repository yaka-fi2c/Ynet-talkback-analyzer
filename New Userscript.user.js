// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  talkback Analyzer- take 2
// @author       yakir fitousi
// @match        https://www.ynet.co.il/articles/**
// @grant        none
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==
$(document).ready(function () {
    // get comments container elemnt
    var commentsContainer = $('.art_tkb_talkbacks')[0],
        // get the 'load more comments button' element
        openMoreTalkbacksBtn = $('#stlkbcopentmoralkbacks a')[0],
        // get the Quantity of talkbacks title
        talkbackTitle = $('#stlkbctitletextdiv')[0],
        // get the element that holds the button
        openMoreTalkbacksElement = $('#stlkbcopentmoralkbacks')[0],
        // get the element that closes the talkbacks
        openLessTalkBacks = $('#stlkbcopentLessTalkbacks')[0];
    //this array will hold object's, every object in the array will contain data of sigle comment.
    var data = [],
        // array to hold the objects with the relvant data (arranged).
        talkbacks = [],
        // object to contain each talkback data
        talkback = {},
        // article objects will hold all the final data
        article = {};
    // function to download file
    function downloadTextFile(text, name) {
        var a = document.createElement('a');
        var type = name.split(".").pop();
        a.href = URL.createObjectURL(new Blob([JSON.stringify(article, undefined, 2)]));
        a.download = name;
        a.click();
    }
    // check if the comments container is shown
    if (commentsContainer && talkbackTitle.innerText !== "לכתבה זו התפרסמו 0 תגובות ב-0 דיונים" && openMoreTalkbacksElement.style.display !== 'none') {
        // interval function that will load the comments as long as openMoreTalkbacksElement is not display none.
        var interval = window.setInterval(clickOpenTalkbacks, 0);
        // click event
        function clickOpenTalkbacks() {
            openMoreTalkbacksBtn.click()
            //clear interval if the display changes
            if (openMoreTalkbacksElement.style.display === 'none') {
                clearInterval(interval)
                // this object on the window object holda all of the comments data, push it into the array.
                window.Cstlkbc.prototype.talkbacks.iterateRows(function (el) { data.push(el) })
                // loop over the data array and get the relevant data from the objects in the array.
                $.each(data, function () {
                    // push every single comment data into a talkback object
                    talkback.unique_identifier = this.id
                    talkback.name = this.name
                    talkback.title = this.title
                    talkback.body = this.text
                    talkback.date = this.the_date
                    talkback.votes = this.ts
                    // push the talkback object to the talkbacks array
                    talkbacks.push(talkback);
                    //empty the object for the next iteration
                    talkback = {}
                })
                console.log(talkbacks)
            }
            // push data to article object
            article.pageUrl = window.location.href;
            article.title = $('.art_header_title').text();
            article.talkBackObjects = talkbacks;
            // count all votes to check average
            var voteCounter = 0;
            // iterate the talkbacks array and count the total votes
            $.each(talkbacks, function (index, talkback) {
                voteCounter += talkback.votes
            });
            // if theres no talkbacks averageVotes should be 0,so:
            article.averageVotes = talkbacks.length ? voteCounter / talkbacks.length : 0;
            console.log('*** ' + JSON.stringify(article));
            // download json
            downloadTextFile(JSON.stringify(article), 'article.json');
        }
    } else if (talkbackTitle.innerText == "לכתבה זו התפרסמו 0 תגובות ב-0 דיונים") {
        article = 'no talkbacks!'
        console.log(article);
    } else if (talkbackTitle.innerText !== "לכתבה זו התפרסמו 0 תגובות ב-0 דיונים" && openMoreTalkbacksElement.style.display == 'none') {
        // this object on the window object holda all of the comments data, push it into the array.
        window.Cstlkbc.prototype.talkbacks.iterateRows(function (el) { data.push(el) })

        $.each(data, function () {
            // push every single comment data into a talkback object
            talkback.unique_identifier = this.id
            talkback.name = this.name
            talkback.title = this.title
            talkback.body = this.text
            talkback.date = this.the_date
            talkback.votes = this.ts
            // push the talkback object to the talkbacks array
            talkbacks.push(talkback);
            //empty the object for the next iteration
            talkback = {}
        })
        console.log(talkbacks);
        // push data to article object
        article.pageUrl = window.location.href;
        article.title = $('.art_header_title').text();
        article.talkBackObjects = talkbacks;
        // count all votes to check average
        var voteCounter = 0;
        // iterate the talkbacks array and count the total votes
        $.each(talkbacks, function (index, talkback) {
            voteCounter += talkback.votes
        });
        // if theres no talkbacks averageVotes should be 0,so:
        article.averageVotes = talkbacks.length ? voteCounter / talkbacks.length : 0;
        console.log('*** ' + JSON.stringify(article));
        // download json
        downloadTextFile(JSON.stringify(article), 'article.json');
    }
});


























