//ajax parser for console in dev tools. first arg is array of pages to parse, second is a tags to find. Just add code below in your dev tools console.
function myParser (urls, tags) {

    var myResult = '<style>.page {background: #eaeaea;padding: 20px;box-sizing: border-box;margin: 30px;}</style>';

    for (x=0; x < urls.length; x++) {
        url = urls[x];                

    	jQuery('html').html('');

            $.ajax({
                url: url,
                dataType: 'html',
                cache: false,
                success: function(data) {
    		jQuery('body').addClass('myres').html(data);
            var tag = '';

            myUrl = this.url.split('?');

            myResult +='<div class="page"><h2>Page: <a href="'+myUrl[0]+'" style="color: #378fbf; text-decoration: none;">'+myUrl[0]+'</a></h2>';

            myResult += '<ul><h3>Tags</h3>';

            for (i = 0; i < tags.length; i++) {            

                tag = tags[i];
                var y = 0;
                jQuery('.myres '+tag).each(function () {
                    myResult += '<li><strong>'+tag+':</strong> ' + jQuery('.myres '+tag+':eq('+y+')').text() + '</li>';
                    y++;
                });

            };

            myResult += '</ul>';

            myResult +="</div>";

                },
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                }
            });
        
    }

    setTimeout(function() {        
            console.log(myResult);
            jQuery('html').html(myResult);
        }, 15000);

}

myUrls = ["https://netversor.com/", "https://netversor.com/en/p/7-about-us", "https://netversor.com/en/contact-us", "https://netversor.com/en/p/5-colocation", "https://netversor.com/en/p/4-cloud-solutions", "https://netversor.com/en/p/9-enterprise-sales-manager", "https://netversor.com/en/p/2-extras", "https://netversor.com/en/p/1-servers", "https://netversor.com/en/p/10-tier-3-technical-support-karlsruhe-germany", "https://netversor.com/en/p/3-data-centers", "https://netversor.com/en/p/6-impressum", "https://netversor.com/de/p/6-impressum"];

myParser(myUrls, ['title', 'description', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);