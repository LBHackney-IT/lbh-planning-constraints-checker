//import { initAll } from "lbh-frontend";
import { Accordion } from "lbh-frontend";
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-pro/css/all.css';

//load the dotenv config in order to use the process.env variables
const regeneratorRuntime = require("regenerator-runtime");
const dotenv = require('dotenv').config();
const axios = require('axios').default;

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
  document.getElementById("results").innerHTML = "";
  document.getElementById("map-link").innerHTML = "";
  document.getElementById("map-iframe").style.display= 'none';
});

function GetAddressesViaProxy() {


  document.getElementById("error_message").innerHTML = "";
  document.getElementById("addresses").innerHTML = 'Loading addresses...';
  document.getElementById("map-link").innerHTML = "";
  document.getElementById("results").innerHTML = "";

  //Get the postcode value
  let postcode = document.getElementById("postcode").value;
  let results = null;
  let full_address = null;
  let UPRN = null;

  document.getElementById("results").innerHTML = "";

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
        document.getElementById("error_message").innerHTML = "No Hackney address found. Please amend your search.";
      }
      else {

        //If there are results from the addresses proxy, we list them. 
        //first, replace list element with a clone of itself, in order to remove previous listeners
        //let listElement = document.getElementById("addresses");
        document.getElementById("addresses").replaceWith(document.getElementById("addresses").cloneNode(true));
        //now fill the list
        document.getElementById("addresses").innerHTML = "<div class='govuk-form-group lbh-form-group'>"
          + "<select class='govuk-select govuk-!-width-full lbh-select' id='selectedAddress' name='selectedAddress'>";

        document.getElementById("selectedAddress").innerHTML = "<option disabled selected value> Select your address from the list </option>";
        for (let index = 0; index < results.length; ++index) {
          full_address = results[index].singleLineAddress;
          UPRN = results[index].UPRN;
          document.getElementById("selectedAddress").innerHTML += "<option value='" + UPRN + "'>" + full_address + "</option>";
        }

        //load more pages of results if needed
        if (pageCount > 1) {
          for (let pgindex = 2 ; pgindex<=pageCount ; ++pgindex){
            loadAddressAPIPageViaProxy(postcode, pgindex);
          }
        }

        //close list of addresses
        document.getElementById("addresses").innerHTML += "</select></div>";

        //capture the change event - when an address is selected - we load the list of results (all the planning constrainst affecting the selected address) using the UPRN selected. 
        document.getElementById("addresses").addEventListener('change', (event) => {
          //console.log('one event');
          //get the selected UPRN from the list of addresses
          let selectedUPRN = document.querySelector('#selectedAddress').value;
          //console.log('uprn = ' + selectedUPRN);
          loadPlanningConstraints(selectedUPRN);
        });  
      }
    }
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
      document.getElementById("selectedAddress").innerHTML += "<option value='" + UPRN + "'>" + full_address + "</option>";
    }
  })
};

function loadPlanningConstraints(selectedUPRN){
  //message about loading
  document.getElementById('results').innerHTML = "<p>Retrieving planning constraints...</p>"; 
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
      const ward =res.data.features[0].properties.ward;

      let textSection = "";



      if (iswithinCA === 'yes'){ 
        textSection += 
        `<div class='govuk-accordion__section'>
          <div class='govuk-accordion__section-header'>
            <h5 class='govuk-accordion__section-heading'>
            <span class='govuk-accordion__section-button' id='default-example-heading-1'> 
            Conservation Areas 
            </span></h5>
          </div>
          <div id='default-example-content-1' class='govuk-accordion__section-content' aria-labelledby='default-example-heading-1'>
            <ul class='lbh-list lbh-list'><li>Name: ` + res.data.features[0].properties.ca_name + `</li></ul>
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
            <ul class='lbh-list lbh-list'><li>List entry number: ` + res.data.features[0].properties.statutory_building_list_entry +  `<br> Date first listed: ` + res.data.features[0].properties.statutory_building_listed_date + `<br> Grade: `+ res.data.features[0].properties.statutory_building_grade + `<br> For more information, visit the ` + `<a href='`+ res.data.features[0].properties.statutory_building_hyperlink+`' target='_black'>Historic England website.</a></li></ul>
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
            <ul class='lbh-list lbh-list'><li>List entry number: ` + res.data.features[0].properties.locally_building_list_entry +  `<br> Date first listed: ` + res.data.features[0].properties.locally_building_listed_date + `<br> Grade: `+ res.data.features[0].properties.locally_building_grade + `<br> For more information, visit the ` + `<a href='`+ res.data.features[0].properties.locally_building_hyperlink+`' target='_black'>Historic England website.</a></li></ul>
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
          <ul class='lbh-list lbh-list'><li>TPO number: ` + res.data.features[0].properties.tpo_area_number +  `<br> Specie: ` + res.data.features[0].properties.tpo_area_specie +  `</a></li></ul>
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
          <ul class='lbh-list lbh-list'><li>TPO number: ` + res.data.features[0].properties.tpo_point_number +  `<br> Specie: ` + res.data.features[0].properties.tpo_point_specie +  `</a></li></ul>
        </div>
      </div>`
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
            <ul class='lbh-list lbh-list--bullet'>`   
            + a4d_list_items +
            `</ul>
          </div>
        </div>`;

      //List the results using an accordion. 
      document.getElementById('results').innerHTML = "<h3>The selected address is in " + ward + " ward.</h3>";
      document.getElementById('results').innerHTML += "<h3>The following planning constraints apply to this property: </h3><div class='govuk-accordion myClass lbh-accordion' data-module='govuk-accordion' id='default-example' data-attribute='value'>" + textSection + "</div>";
            
      //Activate the JS of the component
      const accordion = document.querySelector('[data-module="govuk-accordion"]');
      if (accordion) {
        new Accordion(accordion).init();
      }
      
      //Add button to the planning constraints map  
      //live link    
      //document.getElementById("map-link").innerHTML = "<a href='https://map2.hackney.gov.uk/maps/planning-constraints/index.html?zoom=11&uprn="+ selectedUPRN + "' target='_blank'><span><i class='far fa-map-marker'></i></span></i> &nbsp; View plannning constraints on a map</a>";
      //local test link
      document.getElementById("map-link").innerHTML = "<button class='govuk-button  lbh-button' data-module='govuk-button' href='http://localhost:9000/planning-constraints/index.html?zoom=11&uprn="+ selectedUPRN + "' target='_blank'><span><i class='far fa-map-marker'></i></span></i> &nbsp; View plannning constraints on a map</button>";
      //load the map when clicking on the button
      document.getElementById("map-link").onclick = function loadMap() {
        //local test link
        document.getElementById("map-iframe").src='http://localhost:9000/planning-constraints/embed?uprn='+ selectedUPRN;
        //live link
        //document.getElementById("map-iframe").src='https://map2.hackney.gov.uk/maps/planning-constraints/embed?zoom=11&uprn='+ selectedUPRN;
        document.getElementById("map-iframe").style.display= 'block';
      }
      
    })
    .catch((error) => {
      //Catch geoserver error
      document.getElementById("error_message").innerHTML = 'Sorry, there was a problem retrieving the results for this address.';
    })      
}

