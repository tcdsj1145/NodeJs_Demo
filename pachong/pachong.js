/**
 * Created by susu on 2016/7/25.
 */
var http=require("http");
var cheerio=require("cheerio");
var url='http://www.imooc.com/learn/348';

function filterChapter(html) {
    var $=cheerio.load(html);
    var chapters=$ ('.mod-chapters');

    // [{
    //     chapterTitle:'',
    //     videos:[{
    //         title:'',
    //         id:''
    //     }]
    // }]

    var courseData=[];
    chapters.each(function (item) {
        var chapter=$(this);
        var chapterTitle=chapter.find('strong').text();
        var videos=chapter.find('.video').children('li');
        var chapterData={
            chapterTitle:chapterTitle,
            videos:[]
        };

        videos.each(function (item) {
            var video=$(this);
            var videoTitle=video.text();
            //var id = video.attr('href').split('/video/')[1];
            chapterData.videos.push({
                title:videoTitle
                //  id:id
            });
        });


        courseData.push(chapterData);
    });

    return courseData;
}

function printCourseInfo(courseData) {
    var course_data=[];
    courseData.forEach(function (item) {
        var videos_data=[];
        var chapterTitle=item.chapterTitle;
        console.log(chapterTitle+'\n');

        item.videos.forEach(function (videoItem) {
            // videos_data.push({
            //     title:videoItem.title
            // });
            console.log(videoItem.title+'\n');
        });
        // course_data.push({
        //     chapterTitle:chapterTitle,
        //     videos:videos_data
        // });

    });
    // return course_data;
}

http.get(url,function (res) {
    var html='';
    res.on('data',function (data) {
        html+=data;
    });
    res.on('end',function () {
       var courseData= filterChapter(html);
        //console.log(courseData);
       var course_data= printCourseInfo(courseData);
        // console.log(course_data);
    });
}).on('error',function () {
    console.log("error");
});