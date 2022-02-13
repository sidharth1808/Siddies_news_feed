import magazines from "../data/magazines.js"; 
// importing magazines 


// 1.Fetch the data from the external resource
const getData = async(link) => {
try{
  let res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${link}`);


   
   
     const apiData = await res.json();
     return apiData;
   
   
}catch(error){
  return null;
}
};

// 2.Create accordian and add it to DOM according to magazine array
const addAccordianTODom = async(magazines) =>{
   // 2.1.Add the inner HTML to accordianDiv
  const accordianDiv = document.getElementById("accordion-div");
  accordianDiv.innerHTML = `
  <div class="accordion" id="accordionPanelsStayOpenExample">

  </div>
   `;
   // 2.2.Itreate over the mgazine array
  magazines.forEach( async(element,index) => {
    
   const data = await getData(element);
   
   const accordianItemDiv = document.createElement("div");
   accordianItemDiv.innerHTML = `
   <div class="accordion-item mb-2" id="card${index}">
    <h2 class="accordion-header" id="panelsStayOpen-heading${index}">
      <button class="btn accordian-btn btn-text" id="btn${index}" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${index}" aria-expanded="true" aria-controls="panelsStayOpen-collapse${index}">
      <i class="fas fa-angle-double-down"></i>
      <span class="btn-text-heading">${data["feed"]["title"]}</span>
      </button>
    </h2>
    <div id="panelsStayOpen-collapse${index}" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-heading${index}">
      <div class="accordion-body" id="body${index}">
        
      </div>
    </div>
  </div>
   `;
   document.getElementById("accordionPanelsStayOpenExample").appendChild(accordianItemDiv);

   //logic for only first button to show open when user vists for the first time
   const accordianButton = document.getElementById(`btn${index}`);
   const accordianContentBody = document.getElementById(`panelsStayOpen-collapse${index}`);
  
   if (index === 0) {
    accordianButton.setAttribute("aria-expanded", "true");
  } else {
    accordianButton.setAttribute("aria-expanded", "false");
    accordianContentBody.classList.remove("show");
  }
});
};
// 3.Add carousel to respective accordian
const addCarouselToAccordian = async (magazines) =>{
  // 3.1.Iterating over the magazine array then fetch the feed data
  magazines.forEach(async(rslink, index)=> { 
   const getRssFeedData = await getData(rslink);
   //console.log(getRssFeedData);
   // 3.1.1.Get the accordian body div to add carousel
   const accordianContentDiv = document.getElementById(`body${index}`);
   // 3.1.2.Create div element for carousel
   const accordianCarouselDiv = document.createElement("div");
   accordianCarouselDiv.setAttribute("id", `carouselExampleControls${index}`);
   accordianCarouselDiv.setAttribute("class", "carousel slide");
   accordianCarouselDiv.setAttribute("data-bs-ride", "carousel");
   accordianCarouselDiv.innerHTML=`
   <div class="carousel-inner" id="carouselbody${index}">
   
   </div>
   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${index}" data-bs-slide="prev">
   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
   <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${index}" data-bs-slide="next">
   <span class="carousel-control-next-icon" aria-hidden="true"></span>
   <span class="visually-hidden">Next</span>
  </button>

   `;
   accordianContentDiv.appendChild(accordianCarouselDiv);
   const rssFeedDataItemsArray = getRssFeedData["items"];
   //console.log(rssFeedDataItemsArray);
   const carouselInnerDiv = document.getElementById(`carouselbody${index}`);
   rssFeedDataItemsArray.forEach((element, index) => {
     
    const carouselItem = document.createElement("div");
    if(index === 0){
      carouselItem.setAttribute("class", "carousel-item active");
    }else{
      carouselItem.setAttribute("class", "carousel-item");
    }
    carouselItem.setAttribute("id", `carouselitem${index}`);
    carouselItem.innerHTML = `
<a href="${element["link"]}" id="link">
<div id="back">
    <div style="overflow:hidden">
      <img src ="${element["enclosure"]["link"]}" alt="" class="carousel-img img-fluid" />
    </div>
  <div id="description">
    <div>
      <h3 class = "carousel-heading" style = "color:black">${element["title"]}</h3>
      <p>
        <span class="carousel-subheading" style = "color:#0a0800">${element["author"]}</span>
        <span class="carousel-dot" style = "color:#FF1493"><i class="fa fa-circle" aria-hidden="true"></i></span>
        <span class="carousel-subheading" style = "color:#0a0800">${new Date(element["pubDate"]).toLocaleString("en-IN",{dateStyle:"short"})}</span>
        
      </p>
    </div>
    <div>
    <p class="carousel-description" style = "color:#0a0800">${element["description"]}</p>
    </div>
  </div>
  </div>
</a>
    `;
    carouselInnerDiv.appendChild(carouselItem);
  });
});
};




addAccordianTODom(magazines);
addCarouselToAccordian(magazines);