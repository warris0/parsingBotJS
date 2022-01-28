const axios = require('axios');
const cheerio = require('cheerio');

var lastUrl = "";
var currentUrl = "";

const parse = async() => {
    const getHTML = async(url) => {
        const {data} = await axios.get(url);
        return cheerio.load(data);
    };

    while(true){
        const selector = await (await getHTML('https://freelance.ua/uk/orders/?orders=web-development%2Cprikladnoj-programmist%2Cdatabases%2C1c-programming%2Cqa-testing%2Cgame-programming%2Cembedded-systems%2Cdata-protection%2Cinteractive-applications%2Cplugins-scripts-utilities%2Cweb-proektirovanie%2Cdevelopment-crm-erp%2Csystem-programming%2Cproject-management-development%2Cflash-flex-programming%2Candroid-development%2Cios-development%2Csajt-pod-kljuch%2Conline-shops%2Crefinement-sites%2Cverstka%2Cwap-pda-sites%2Cusability%2Cflash-sites%2Csite-design%2Clogo%2Cbanners%2Cpackaging-design%2Coutdoor-advertising%2Cdesign-of-exhibition-stands%2Cinfographics%2Ctechnical-design%2Ccorporate-identity%2Cdesign-application-interfaces%2Cprinting-layout%2Cdesigner-embroidery-machine%2Cinterface-design%2Ccartography%2Cprint-design%2Cpresentations%2Cindustrial-design%2Ctype-design%2Cverstka-elektronnyih-izdaniy%2Cprepress&pt=1510&pc=1'));
        
        selector('.j-order').each((i, element) => {

            if(!selector(element).find('i').hasClass('c-icon-fixed')) {
                currentUrl = selector(element).find('a').attr('href');
                console.log(currentUrl);
                return false;
            }else{
                console.log(" === no ");
            }
        });

        isNew(lastUrl, currentUrl)
        lastUrl = currentUrl;

        console.log('-'.repeat(currentUrl.length));
        sleep(8000);
    }
}

function isNew(oldUrl, newUrl){
    if(oldUrl === newUrl){
        console.log(' oldUrl === newUrl ');
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function start(){
    parse();
}

export {start};
