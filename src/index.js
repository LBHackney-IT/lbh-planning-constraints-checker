//import { initAll } from "lbh-frontend";
import { Accordion } from "lbh-frontend";
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-pro/css/all.css';

//load the dotenv config in order to use the process.env variables
const regeneratorRuntime = require("regenerator-runtime");
const dotenv = require('dotenv').config();
const axios = require('axios').default;

//activate the start button
document.getElementById("start-button").onclick = function(){
  document.getElementById("location-search").hidden = false;
  document.getElementById("start-button").style.display = "none";
  //document.getElementById("search").scrollIntoView();
  // window.parent.scrollBy(0,200);
};

// Create a variable for the postcode. 
let postcode = document.getElementById('postcode');
//Enter key listener that calls the GetAddressesviaPoxy function
postcode.addEventListener('keyup', (e) => {
  if (e.key == 'Enter'){
    GetAddressesViaProxy();
  }
});

//eventlistener for the button
document.getElementById("search").addEventListener("click", GetAddressesViaProxy);

//listener for the clear x in the input
postcode.addEventListener("search", (e) => {
  document.getElementById("error_message").innerHTML = "";
  document.getElementById("addresses").innerHTML = '';
  document.getElementById("address-details").innerHTML = "";
  document.getElementById("show-results-button").innerHTML = "";
  document.getElementById("results").innerHTML = "";
  document.getElementById("map-link").innerHTML = "";
  document.getElementById("map-header").innerHTML = "";
  document.getElementById("map-iframe").style.display= 'none';
});

function GetAddressesViaProxy() {
  document.getElementById("error_message").innerHTML = "";
  document.getElementById("addresses").innerHTML = 'Loading addresses...';
  document.getElementById("address-details").innerHTML = "";
  document.getElementById("show-results-button").innerHTML = "";
  document.getElementById("results").innerHTML = "";
  document.getElementById("map-link").innerHTML = "";
  document.getElementById("map-header").innerHTML = "";
  document.getElementById("map-iframe").style.display= 'none';

  //Get the postcode value
  let postcode = document.getElementById("postcode").value;
  let results = null;
  

  // document.getElementById("results").innerHTML = "";
  // document.getElementById("address-details").innerHTML = "";

  //First call to get the list of addresses from a postcode
  fetch(`${process.env.ADDRESSES_API_PROXY_PROD}?format=detailed&query=${postcode}`, {
    method: "get"
  })
  .then(response => response.json())
  .then(data => {
    //console.log(data);
    //Get API error messages if the UPRN values are not right
    if (data.data.errors) {
      document.getElementById("error_message").innerHTML = response.data.errors[0].message;
      document.getElementById("addresses").innerHTML = '';
    //If there are no errors...
    } 
    else {
      results = data.data.data.address;
      let pageCount = data.data.data.pageCount;
      //If there are no results, the postcode is not right. 
      if (results.length === 0) {
        document.getElementById("error_message").innerHTML = "No Hackney location found. Please amend your search.";
        document.getElementById("addresses").innerHTML = '';
        document.getElementById("address-details").innerHTML = '';
      }
      else {

        //If there are results from the addresses proxy, we list them. 
        //first, replace list element with a clone of itself, in order to remove previous listeners
        //let listElement = document.getElementById("addresses");
        document.getElementById("addresses").replaceWith(document.getElementById("addresses").cloneNode(true));
        //now fill the list
        document.getElementById("addresses").innerHTML = "<div class='govuk-form-group lbh-form-group'>"
          + "<select class='govuk-select govuk-!-width-full lbh-select' id='selectedAddress' name='selectedAddress'>";

        document.getElementById("selectedAddress").innerHTML = "<option disabled selected value> Select a location from the list </option>";
        for (let index = 0; index < results.length; ++index) {
          // full_address = results[index].singleLineAddress;
          // UPRN = results[index].UPRN;
          document.getElementById("selectedAddress").innerHTML += "<option value='" + results[index].UPRN + "//" + results[index].singleLineAddress + "//" + results[index].usageDescription + "//" + results[index].ward + "'>" + results[index].singleLineAddress + "</option>";
        }

        //load more pages of results if needed
        if (pageCount > 1) {
          for (let pgindex = 2 ; pgindex<=pageCount ; ++pgindex){
            loadAddressAPIPageViaProxy(postcode, pgindex);
          }
        }

        //close list of addresses
        document.getElementById("addresses").innerHTML += "</select></div>";

        // window.parent.scrollBy(0,200);

        //capture the change event - when an address is selected - we load the list of results (all the planning constrainst affecting the selected address) using the UPRN selected. 
        document.getElementById("addresses").addEventListener('change', (event) => {
          //console.log('one event');
          //get the selected UPRN and address details from the list of addresses
          let selectedAddressDetails = document.querySelector('#selectedAddress').value.split('//');
          let selectedUPRN = selectedAddressDetails[0];
          //console.log('uprn = ' + selectedUPRN);
          showAddressDetails(selectedAddressDetails);
          showPlanningInfoButton(selectedUPRN);
        });  
        document.getElementById("addresses").scrollIntoView();
        console.log('getElementById("addresses").scrollIntoView()')
      }
    }
  }).catch(error => {
    document.getElementById("error_message").innerHTML = "Sorry, an error occured while retrieving locations";
    document.getElementById("addresses").innerHTML = '';
  })
};

//function to add one page of results to the options list
function loadAddressAPIPageViaProxy(postcode, pg) {
  let results = null;
  let full_address = null;
  let UPRN = null;
  fetch(`${process.env.ADDRESSES_API_PROXY_PROD}?format=detailed&query=${postcode}&page=${pg}`, {
    method: "get"
  })
  .then(response => response.json())
  .then(data => {
    //console.log(data);
    results = data.data.data.address;
    //console.log(results);
    for (let index = 0; index < results.length; ++index) {      
      // full_address = [results[index].line1, results[index].line2, results[index].line3, results[index].line4].filter(Boolean).join(", ");
      full_address = results[index].singleLineAddress;
      UPRN = results[index].UPRN;
      //console.log(coordinatesEN);
      document.getElementById("selectedAddress").innerHTML += "<option value='" + results[index].uprn + "/" + results[index].singleLineAddress + "/" + results[index].usageDescription + "/" + results[index].ward + "'>" + results[index].singleLineAddress + "</option>";
    }
  })
};

function showAddressDetails(selectedAddressDetails){
  document.getElementById('address-details').innerHTML = "<h3>Selected location: </h3>";
  document.getElementById('address-details').innerHTML += 
      `<dl class="govuk-summary-list lbh-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">Address</dt>
        <dd class="govuk-summary-list__value">${toTitleCase(selectedAddressDetails[1])}</dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">Usage</dt>
        <dd class="govuk-summary-list__value">${selectedAddressDetails[2]}</dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">Ward</dt>
        <dd class="govuk-summary-list__value">${selectedAddressDetails[3]}</dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">Unique Property <br>Reference Number</dt>
        <dd class="govuk-summary-list__value">${selectedAddressDetails[0]}</dd>
      </div>
    </dl>`;
    // window.parent.scrollBy(0,200);
}

function showPlanningInfoButton(selectedUPRN){
  //Add button to load planning info as accordion  
  document.getElementById("show-results-button").innerHTML = "<button class='govuk-button  lbh-button' data-module='govuk-button'><span><i class='far fa-list'></i></span></i> &nbsp; View planning information on this location</button>";
  //local test link
  //document.getElementById("map-link").innerHTML = "<button class='govuk-button  lbh-button' data-module='govuk-button' href='http://localhost:9000/planning-constraints/index.html?uprn="+ selectedUPRN + "' target='_blank'><span><i class='far fa-map-marker'></i></span></i> &nbsp; View planning information on a map</button>";
  //load the map when clicking on the button
  document.getElementById("show-results-button").onclick = function loadInfo(){
    loadPlanningConstraints(selectedUPRN);
  };
  //Scroll down to show the show results button
  // document.getElementById('iframe-checker-app').contentWindow.document.getElementById("show-results-button").scrollIntoView();
  // window.parent.scrollBy(0,200);
  document.getElementById("show-results-button").scrollIntoView();
  console.log('getElementById("show-results-button").scrollIntoView()')
}

function loadPlanningConstraints(selectedUPRN){
  //message about loading
  document.getElementById('results').innerHTML = "<p>Retrieving planning information...</p>"; 
  document.getElementById("map-link").innerHTML = "";
  document.getElementById("map-iframe").style.display = 'none';
  //console.log(selectedUPRN);
  //call to the planning constraints layer where we have all the planning information for each UPRN
  axios.get(`${process.env.GEOSERVER_URL}?service=WFS&version=1.0.0&request=GetFeature&outputFormat=json&typeName=planning_constraints_by_uprn&cql_filter=uprn='${selectedUPRN}'`)
    .then((res) => {
      //console.log(res.data);
      //Variables
      const iswithinCA = res.data.features[0].properties.within_conservation_area;
      const iswithinLocallyListedBuilding = res.data.features[0].properties.within_locally_building;
      const iswithinListedBuilding = res.data.features[0].properties.within_statutory_building;
      const iswithinTPOArea= res.data.features[0].properties.within_tpo_area;
      const containsTPOPoint= res.data.features[0].properties.contains_tpo_point;
      const iswithinLivePlanningApp = res.data.features[0].properties.within_live_planning_app;
      const ward =res.data.features[0].properties.ward;

      let textSection = "";

      if (iswithinCA === 'yes'){ 
        textSection += 
        `<div class='govuk-accordion__section'>
          <div class='govuk-accordion__section-header'>
            <h5 class='govuk-accordion__section-heading'>
            <span class='govuk-accordion__section-button' id='default-example-heading-1'> 
            Conservation Area 
            </span></h5>
          </div>
          <div id='default-example-content-1' class='govuk-accordion__section-content' aria-labelledby='default-example-heading-1'>
          <p>This location is inside (or partly inside) ${res.data.features[0].properties.ca_name} conservation area.</p>
          </div>
        </div>`;
      }
      if (iswithinListedBuilding === 'yes'){
        textSection += 
        `<div class='govuk-accordion__section'>
          <div class='govuk-accordion__section-header'>
            <h5 class='govuk-accordion__section-heading'>
            <span class='govuk-accordion__section-button' id='default-example-heading-1'> 
            Statutory Listed Building
            </span></h5>
          </div>
          <div id='default-example-content-1' class='govuk-accordion__section-content' aria-labelledby='default-example-heading-1'>
          <p>This location is in a statutory listed building:</p> 
          <ul class='lbh-list lbh-list'><li>List entry number: ${res.data.features[0].properties.statutory_building_list_entry} <br> Date first listed: ${res.data.features[0].properties.statutory_building_listed_date} <br> Grade: ${res.data.features[0].properties.statutory_building_grade} <br> For more information, visit the <a href='${res.data.features[0].properties.statutory_building_hyperlink}' target='_blank'>Historic England website.</a></li></ul>
          </div>
        </div>`;

      }

      if (iswithinLocallyListedBuilding === 'yes'){
        textSection += 
        `<div class='govuk-accordion__section'>
          <div class='govuk-accordion__section-header'>
            <h5 class='govuk-accordion__section-heading'>
            <span class='govuk-accordion__section-button' id='default-example-heading-1'> 
            Locally Listed Building
            </span></h5>
          </div>
          <div id='default-example-content-1' class='govuk-accordion__section-content' aria-labelledby='default-example-heading-1'>
          <p>This location is in a locally listed building: </p>  
          <ul class='lbh-list lbh-list'><li>List entry number: ${res.data.features[0].properties.locally_building_list_entry} <br> Date first listed: ${res.data.features[0].properties.locally_building_listed_date} <br> Grade: ${res.data.features[0].properties.locally_building_grade } <br> For more information, visit the <a href='${res.data.features[0].properties.locally_building_hyperlink}' target='_blank'>Historic England website.</a></li></ul>
          </div>
        </div>`;

      }

      
      if (iswithinTPOArea === 'yes'){
        textSection += 
        `<div class='govuk-accordion__section'>
        <div class='govuk-accordion__section-header'>
          <h5 class='govuk-accordion__section-heading'>
          <span class='govuk-accordion__section-button' id='default-example-heading-1'> 
          Tree Preservation Orders (TPOs)
          </span></h5>
        </div>
        <div id='default-example-content-1' class='govuk-accordion__section-content' aria-labelledby='default-example-heading-1'>
        <p>There is at least one protected tree within the location boundaries:</p> 
          <ul class='lbh-list lbh-list'><li>TPO number: ${res.data.features[0].properties.tpo_area_number} <br> Specie: ${res.data.features[0].properties.tpo_area_specie} </a></li></ul>
          </div>
      </div>`
      }

      if (containsTPOPoint === 'yes'){
        textSection += 
        `<div class='govuk-accordion__section'>
        <div class='govuk-accordion__section-header'>
          <h5 class='govuk-accordion__section-heading'>
          <span class='govuk-accordion__section-button' id='default-example-heading-1'> 
          Tree Preservation Orders (TPOs)
          </span></h5>
        </div>
        <div id='default-example-content-1' class='govuk-accordion__section-content' aria-labelledby='default-example-heading-1'>
        <p>There is at least one protected tree within the location boundaries:</p>
          <ul class='lbh-list lbh-list'><li>TPO number: ${res.data.features[0].properties.tpo_point_number} <br> Specie: ${res.data.features[0].properties.tpo_point_specie} </a></li></ul>
        </div>
      </div>`
      }

      if (iswithinLivePlanningApp === 'yes'){
          textSection += 
          `<div class='govuk-accordion__section'>
            <div class='govuk-accordion__section-header'>
              <h5 class='govuk-accordion__section-heading'>
              <span class='govuk-accordion__section-button' id='default-example-heading-1'> 
              Active Planning Applications
              </span></h5>
            </div>
            <div id='default-example-content-1' class='govuk-accordion__section-content' aria-labelledby='default-example-heading-1'>
            <p>There is at least one ongoing planning application on this location:</p>
              <ul class='lbh-list lbh-list'><li>Planning Application Reference Number: ${res.data.features[0].properties.planning_app_ref_number} <br> Planning Application Type: ${res.data.features[0].properties.planning_app_type} <br> Date it was received: ${res.data.features[0].properties.planning_app_received_date} <br>  ${res.data.features[0].properties.planning_app_register_link}</a></li></ul>
            </div>
          </div>`;  
      }
    
      //Split A4D names as list items
      let a4d_list = res.data.features[0].properties.a4d_names.split(","); 
      let a4d_list_items = ""; 
      for (let index = 0; index < a4d_list.length; ++index) {
        a4d_list_items+= `<li>` +a4d_list[index]+`</li>`
      }
      //console.log(a4d_list_items);

      textSection += 
        `<div class='govuk-accordion__section'>
          <div class='govuk-accordion__section-header'>
            <h5 class='govuk-accordion__section-heading'>
            <span class='govuk-accordion__section-button' id='default-example-heading-1'> 
            Article 4 Directions
            </span></h5>
          </div>
          <div id='default-example-content-1' class='govuk-accordion__section-content' aria-labelledby='default-example-heading-1'>
            <p>This location falls in the following <a href="https://hackney.gov.uk/article-4-directions" target='_blank'>Article 4 Directions</a> areas:</p>
            <ul class='lbh-list lbh-list--bullet'>`   
            + a4d_list_items +
            `</ul>
          </div>
        </div>`;

      //List the results using an accordion. 
      document.getElementById('results').innerHTML = "<h3>Planning information relevant to this location: </h3><div class='govuk-accordion myClass lbh-accordion' data-module='govuk-accordion' id='default-example' data-attribute='value'>" + textSection + "</div>";
      //remove the button above
      document.getElementById("show-results-button").innerHTML = "";      
      //Activate the JS of the component
      const accordion = document.querySelector('[data-module="govuk-accordion"]');
      if (accordion) {
        new Accordion(accordion).init();
      }
      
      //Add button to the planning constraints map  
      //live link    
      document.getElementById("map-link").innerHTML = "<button class='govuk-button  lbh-button' data-module='govuk-button'><span><i class='far fa-map-marker'></i></span></i> &nbsp; View this planning information on a map</button>";
      //local test link
      //document.getElementById("map-link").innerHTML = "<button class='govuk-button  lbh-button' data-module='govuk-button' href='http://localhost:9000/planning-constraints/index.html?uprn="+ selectedUPRN + "' target='_blank'><span><i class='far fa-map-marker'></i></span></i> &nbsp; View planning information on a map</button>";
      //load the map when clicking on the button
      document.getElementById("map-link").onclick = function loadMap() {
        document.getElementById('map-header').innerHTML = "<p>Loading map...</p>"; 
        //local test link
        //document.getElementById("map-iframe").src='http://localhost:9000/planning-constraints/embed?uprn='+ selectedUPRN;
        //live link
        document.getElementById("map-iframe").src='https://map2.hackney.gov.uk/maps/planning-constraints/embed?uprn='+ selectedUPRN;
        document.getElementById("map-iframe").style.display= 'block';
        setTimeout(() => {document.getElementById("map-header").innerHTML = "<h3>Map view:</h3>";}, 4500);
        setTimeout(() => {document.getElementById("map-link").innerHTML = ""; }, 4500);
        //Scroll down to show the map
        // document.getElementById('iframe-checker-app').contentWindow.document.getElementById("div-map-iframe").scrollIntoView();
        document.getElementById("map-iframe").scrollIntoView();
        console.log('getElementById("map-iframe").scrollIntoView()')
        //window.parent.scrollBy(0,200);
      }      
      //Scroll down to see the results list
      // document.getElementById('iframe-checker-app').contentWindow.document.getElementById("results").scrollIntoView();
      // window.parent.scrollBy(0,200);
      document.getElementById("map-link").scrollIntoView();
      console.log('getElementById("map-link").scrollIntoView()')
    })
    .catch((error) => {
      //Catch geoserver error
      document.getElementById("error_message").innerHTML = 'Sorry, there was a problem retrieving the results for this address.';
    })  
}


function toTitleCase(str){
  let wordArr = str.split(" ");
  let i = 0;
  let titeCaseStr = '';
  for (i = 0 ; i < wordArr.length-2 ; i++){
    titeCaseStr += wordArr[i][0].toUpperCase() + wordArr[i].substring(1).toLowerCase() + " ";
  }
  titeCaseStr += wordArr[wordArr.length-2] + " " + wordArr[wordArr.length-1]
  return titeCaseStr;
}

