function articleSearch(title,resLimit){
  var baseUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json";
  var title= title; 
  var prop = "&prop=pageterms";
  var searchTerm = "&gpssearch=" + title;
  var gpsLimit = "&gpslimit=" + resLimit;
  var otherParams = "&generator=prefixsearch&redirects=1&formatversion=2&wbptterms=description";
  var url = baseUrl + prop + searchTerm + otherParams + gpsLimit + title + "&callback=?";
  if(title==""){
        $("#wiki").css("margin-top","15%");
        $("#moreRes").css("display","none"); 
  }
  $.getJSON(url,function(json){
    if ($('#content').is(':empty') && title.length!==0){
      $.each(json.query.pages,function(key,element){
        if(element.terms){
          var hyperlink = "https://en.wikipedia.org/?curid=" +element.pageid;
          $("#wiki").css("margin-top","2%");
          $("#content").append("<a id=\"cont"+key+"\" href=\""+hyperlink+"\" target=\"_blank\">"+"</a>");
          $("#cont"+key).append("<div class=\"results\"></div>").slideDown("normal");
          $("#cont"+key).children().append("<h3>"+element.title+"</h3>");
          $("#cont"+key).children().append("<h4>"+element.terms.description+"</h4>").hide().show("normal");
        }       
      });
      if(resLimit<=10){ 
        $("#moreRes").css("display","initial"); 
      }
    }
  });
} 
$(document).ready(function(){  
  
  $("#liveSearch").hide().slideDown("slow");
  $("#randomArticle").hide().slideDown("slow");
  
  $(function(){
    $('[data-toggle="tooltip"]').tooltip()
  });  
   
  $("#title").animate({
    fontSize:"50px" 
  },500);

  // $("#title").hover(function(){
  //   $("#title").animate({
  //     fontSize:"80px", 
  //   },500);
  // },function(){
  //   $("#title").animate({
  //     fontSize:"50px",
  //     color:"white"
  //   },500);
  // });
  
  $("#liveSearch").on("click keyup",function(){
    $("#liveSearch").tooltip("hide")
  });
  
  $("#liveSearch").keyup(function(){
    var elem = $(this);
    setTimeout(function(){
      $("#content").empty();   
      var title = elem.val().replace(/\s/g,"+"); 
      articleSearch(title,5);
      console.log(title); 
    },200);
  });

  $("#moreRes").click(function(){
    $("#content").empty();
    var title = $("#liveSearch").val().replace(/\s/g,"+"); 
    articleSearch(title,20);
    $("#moreRes").css("display","none");
  });  
  
});