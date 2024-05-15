var bookmarkName=document.getElementById("name")
var bookmarkURL = document.getElementById("url")
var bookMarkText=document.getElementById("bookMarkText")
var bookMarkUrl=document.getElementById("bookMarkUrl")
var bookmark;

if (localStorage.getItem('mysites') != null) {
    bookmark = JSON.parse(localStorage.getItem('mysites'));
    displayBookmark(bookmark);
}
else{
    bookmark=[];
}

function  addBookmark(){
    var check1=validateSiteName(bookmarkName.value)
    var check2 = validateSiteUrl()
    if(check1==false || check2==false){
        if(validateSiteName(bookmarkName.value) == true){
            bookMarkText.style.display = "none";
        }
        if(validateSiteUrl() == true)
        {
            bookMarkUrl.style.display = "none";
        }
    }
    else if(check1==true || check2==true){
    var sites={
        name:bookmarkName.value,
        url:bookmarkURL.value
    }
    bookmark.push(sites)
    localStorage.setItem("mysites",JSON.stringify(bookmark))
    clearForm();
    displayBookmark(bookmark)}
}

function displayBookmark(site){
    var cartoona=``;
    for(let i=0;i<site.length;i++){
        cartoona+=`
        <div class="sites d-flex  p-3 m-auto mb-2">
            <h4 class="text-white m-auto fs-3 text-center">${site[i].name}</h4>
            <div class="btns ms-auto pe-5 d-flex">
                <button class="mx-3 btn btn-primary btn-lg px-4" onclick="VisitSite(${i})" >Visit</button>
                <button class=" btn btn-danger btn-lg"onclick="deleteSite(${i})">Delete</button>
            </div>
        </div>`
    }
    document.getElementById("addedSites").innerHTML=cartoona;
}

function clearForm(){
    bookmarkName.value="";
    bookmarkURL.value=""
}

function deleteSite(deletedTerm){
    bookmark.splice(deletedTerm,1);
    localStorage.setItem("mysites",JSON.stringify(bookmark));
    displayBookmark(bookmark);
}

function VisitSite(vistedSite){
    window.open(bookmark[vistedSite].url , "_blank");
}

function validateSiteName(siteName){
    if (bookmarkName.value == ""){
        bookMarkText.style.displayBookmark = "block";
        bookMarkText.textContent ="Please enter a site Name!"; 
        return false;
        }
    else {
         var regex= /^[a-z ,.'-]+$/
         if(regex.test(siteName) == true)
         {
             bookMarkText.style.display = "none";
             return true;
         }
         else
         {
             bookMarkText.style.display = "block";
             bookMarkText.textContent = "Please Enter letters only";
             return false;}
    }
}


function validateSiteUrl(){
    if (bookMarkUrl.value == ""){
        bookMarkUrl.style.displayBookmark = "block";
        bookMarkUrl.textContent ="Please enter a site Url!"; 
        return false;
    } else {
       var regex1= /^(http|https):\/\//; // Changed regex to match both http and https
       var regex2= /\.com$/; // Corrected regex to match .com at the end
       if(regex1.test(bookmarkURL.value) && regex2.test(bookmarkURL.value)){
            bookMarkUrl.style.display = "none";
            return true;
       } else {
            bookMarkUrl.style.display = "block";
            bookMarkUrl.textContent = "Please Enter a correct URL (e.g., http://example.com)";
            return false;
       }
    }
}

