
var link
function SearchBook()
{
    
    var input=document.getElementById("in").value
    console.log(input)
    if(input!=""){
        document.getElementById("p").innerHTML="searching"
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                link=xmlHttp.responseText;
                document.getElementById("save").innerHTML=link
        }
        xmlHttp.open("GET", "https://backend.lumilukonsalasanat.duckdns.org/search_book?book="+input, true); // true for asynchronous 
        xmlHttp.send("test");
    }else{
        document.getElementById("p").innerHTML="no book given, first give a book"
    }
}

function idle(){
    console.log("run")
    if(link!=null){
        if(document.getElementById("save").innerHTML.includes("unidentified")  ||document.getElementById("save").innerHTML.includes("undefined")){

        }else{
            document.getElementById("p").innerHTML=document.getElementById("save").innerHTML.replace(/-/gi," ").replace(/_/gi,"")
        }
    }
}


window.onload = function() {

    var target = document.getElementById("save");
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        idle()
      });
    });

    var config = {
      childList: true,
      subtree: true,
      characterData: true
    };

    observer.observe(target, config);
}



function getBook()
{
    if(link!=null){
        document.getElementById("p").innerHTML="processing"
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                var get=xmlHttp.responseText;
                document.getElementById("save").innerHTML=get
        }
        console.log(link)
        xmlHttp.open("GET", "https://backend.lumilukonsalasanat.duckdns.org/get_book?link="+link, true); // true for asynchronous 
        xmlHttp.send("test");
    }else{
        document.getElementById("p").innerHTML="no link, first search a book"
    }
}