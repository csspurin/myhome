let selectTouristData = [];
let selectPage = 1;

const topCity = document.querySelector('.top-city ul');
const citySelect = document.querySelector('.city-select select');
const citySelectYear = document.querySelector('.cityyear-select select');
const cityName = document.querySelector('.city-name');
const tourist = document.querySelector('.place-list');
const pageSelect = document.querySelector('.page-number');

// EventListerner
topCity.addEventListener('click', selectTopZone, false);
citySelect.addEventListener('change', selectZone, false);
citySelectYear.addEventListener('change', selectZoneYear, false);
pageSelect.addEventListener('click', changePage, false);


function init() {
  renderZoneSelect();
  renderZoneSelectYear();
  renderTopZone();

  // Default: show all data
  selectData('all');
}

function renderZoneSelect() {
  const zoneSelect = touristData.map(tourist => { return tourist.Zone });
  const zonelist = zoneSelect
  .filter(function (elment, index, arr) {
    return arr.indexOf(elment) === index;
  })
  .sort(function (a, b) {
      if (a < b) return -1;
      else if (a > b) return 1;
      return 0;
  });

  let str = '';
  str += `<option value="all">- - 請選擇影片分類 - -</option>`;
  for (let i = 0; i < zonelist.length; i++) {
    str += `<option value="${zonelist[i]}">${zonelist[i]}</option>`;
  }



  citySelect.innerHTML = str;
}

function renderZoneSelectYear() {
  const zoneSelect = touristData.map(tourist => { return tourist.year });
  const zonelist = zoneSelect.filter(function (elment, index, arr) {
    return arr.indexOf(elment) === index;
  })

  let str = '';
  str += `<option value="all">- - 請選擇影片年代 - -</option>`;
  for (let i = 0; i < zonelist.length; i++) {
    str += `<option value="${zonelist[i]}">${zonelist[i]}</option>`;
  }

  citySelectYear.innerHTML = str;
}

function selectZone(e) {
  selectData(e.target.value);
}

function selectZoneYear(e) {
  selectDataYear(e.target.value);
}

function selectTopZone(e) {
  if (e.target.tagName === 'LI') {
    selectData(e.target.innerText);
  }
}

function selectData(zone) {
  const touristList = zone === 'all' ? touristData : touristData.filter(item => item.Zone === zone);
  // Select the data of the zone and store to the another array
  selectTouristData = touristList;
  cityName.innerHTML = zone === 'all' ? '全部影片' : zone;

  // Default show the first page(no.1~no.8 data)
  renderPageNumber(1);
  selectPageData(1)
  selectPage = 1;
}

function selectDataYear(year) {
  const touristList = year === 'all' ? touristData : touristData.filter(item => item.year === year);
  // Select the data of the zone and store to the another array
  selectTouristData = touristList;
  cityName.innerHTML = year === 'all' ? '全部影片' : year;

  // Default show the first page(no.1~no.8 data)
  renderPageNumber(1);
  selectPageData(1)
  selectPage = 1;
}

function changePage(e) {
  const pageNum = Number(e.target.innerText);
  const totalpage = Math.ceil(selectTouristData.length / 32);

  // click page number
  if (e.target.className === "page-number-item") {
    selectPageData(pageNum);
    renderPageNumber(pageNum);
    selectPage = pageNum;
  }

  // click prev page
  if (e.target.className === "page-item prev") {
    const prevPage = (selectPage - 1 === 0) ? selectPage : (selectPage - 1);
    selectPage = prevPage;
    selectPageData(prevPage);
    renderPageNumber(prevPage);
  }

  // click next page
  if (e.target.className === "page-item next") {
    const nextPage = (selectPage + 1 > totalpage) ? selectPage : (selectPage + 1);
    selectPage = nextPage;
    selectPageData(nextPage);
    renderPageNumber(nextPage);
  }
}

function selectPageData(pageNum) {
  const pageData = selectTouristData.slice((pageNum - 1) * 32, pageNum * 32);
  renderTouristList(pageData);
}


function renderPageNumber(pageNum) {
  const totalpage = Math.ceil(selectTouristData.length / 32);
  const prevPage = `<li class="page-item prev">◀ Prev </li>`;
  const nextPage = `<li class="page-item next">Next ▶</li>`;
  let str = '';

  for (let i = 1; i <= totalpage; i++) {
    str += (i === pageNum) ?
      `<li class="page-number-item active">${i}</li>`
      :
      `<li class="page-number-item">${i}</li>`
  }

  pageSelect.innerHTML = (totalpage > 1) ? prevPage + str + nextPage : str;
}

function renderTopZone() {
  const topCityList = [
    { city: 'Mickey', color: '#c62121' },
    { city: 'Donald', color: '#559AC8' },
    { city: 'Goofy', color: '#097400' },
    { city: 'Pluto', color: '#F5D005' },
    { city: 'Chip_Dale', color: '#a26239' },


    { city: 'Mickey_allfriend', color: '#c62121' },
    { city: 'Mickey_Minnie', color: '#c62121' },
    { city: 'Mickey_Donald', color: '#c62121' },
    { city: 'Mickey_Pluto', color: '#c62121' },

    { city: 'Donald_Goofy', color: '#559AC8' },
    { city: 'Donald_Nephew', color: '#559AC8' },
    { city: 'Donald_Daisy', color: '#559AC8' },
    { city: 'Donald_Pluto', color: '#559AC8' },
    { city: 'Scrooge_Nephew', color: '#559AC8' },

    { city: 'Chip_Dale_Donald', color: '#a26239' },
  ]

  let str = '';
  for (let i = 0; i < topCityList.length; i++) [
    str += `<li style="background:${topCityList[i].color}">${topCityList[i].city}</li>`
  ]

  topCity.innerHTML = str;
}

function renderTouristList(touristList) {
  let str = '';

  if (touristList.length === 0) {
    str += `<p class="remind">無影片</p>`
  }

  for (let i = 0; i < touristList.length; i++) {
    str +=
      `<div class="placeItem" >
          <div class="place-img" style="background-image: url('http://img.youtube.com/vi/${touristList[i].Picture1}/mqdefault.jpg')">
            <div class="palce-name">${touristList[i].Name}</div>
          </div>
          <div class="place-info">
          <div class="place-info-item">
            <span>集數:</span>
            <span>${touristList[i].episode}</span>
          </div>
          <div class="place-info-item">
            <span>年代:</span>
            <span>${touristList[i].year}</span>
          </div>
          <div class="place-info-item">
              <span>影片分類:</span>
              <span>${touristList[i].Zone}</span>
          </div>
          <div class="place-info-item">
            <span>系列別:</span>
            <span>${touristList[i].serise}</span>
          </div>
            <div class="place-info-item">
              <span>簡介:</span>
              <span>${touristList[i].Add}</span>
            </div>
            <div class="video__ListContent">
              <a href="#" class="btn btn-default btn-sm" data-toggle="modal" data-target="#myModal" data-video="${touristList[i].Picture1}" title="${touristList[i].Name}">查看影片</a>
            </div>
          </div>
        </div>
      `
  }

  tourist.innerHTML = str;
}

init();
