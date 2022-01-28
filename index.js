const { parse } = require('dotenv')
const { Telegraf, Markup } = require('telegraf')
const axios = require('axios');
const cheerio = require('cheerio');
const my_const = require('./const')
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN)
const user_id = '805545959'

var isPars = false

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
bot.help((ctx) => ctx.reply(my_const.allCommands))

bot.start(async (ctx) => {
    try{
        await ctx.replyWithHTML(`Hello little ${ctx.message.from.first_name ? 
            ctx.message.from.first_name : 'stranger'} bitch!!!`,
            Markup.inlineKeyboard(
                [
                    [Markup.button.callback('Parsing', 'pars_btn')]
                ]
            ))
    }catch(e){
        console.log(`Error: ${e}`)
    }
})

// ------------------------------------------------------------------------

//parsing

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

bot.action('pars_btn', async (ctx) =>{
    if(!isPars){
        isPars = true
        ctx.reply('Parsing is started betch!!!')
        console.log("     --- parser started ---     ")
        
    }else{
        isPars = false
        ctx.reply('Parsing is stoped betch!!!')
        console.log("     --- parser stopped ---     ")
    }
})


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var lastUrl = "";
var currentUrl = "";

const startParse = async() => {
    const getHTML = async(url) => {
        const {data} = await axios.get(url);
        return cheerio.load(data);
    };
    
    setTimeout(async function  run() {

        try{
            if(isPars) {
                const selector = await (await getHTML('https://freelance.ua/uk/orders/?orders=web-development%2Cprikladnoj-programmist%2Cdatabases%2C1c-programming%2Cqa-testing%2Cgame-programming%2Cembedded-systems%2Cdata-protection%2Cinteractive-applications%2Cplugins-scripts-utilities%2Cweb-proektirovanie%2Cdevelopment-crm-erp%2Csystem-programming%2Cproject-management-development%2Cflash-flex-programming%2Candroid-development%2Cios-development%2Csajt-pod-kljuch%2Conline-shops%2Crefinement-sites%2Cverstka%2Cwap-pda-sites%2Cusability%2Cflash-sites%2Csite-design%2Clogo%2Cbanners%2Cpackaging-design%2Coutdoor-advertising%2Cdesign-of-exhibition-stands%2Cinfographics%2Ctechnical-design%2Ccorporate-identity%2Cdesign-application-interfaces%2Cprinting-layout%2Cdesigner-embroidery-machine%2Cinterface-design%2Ccartography%2Cprint-design%2Cpresentations%2Cindustrial-design%2Ctype-design%2Cverstka-elektronnyih-izdaniy%2Cprepress&pt=1510&pc=1'));
            
                selector('.j-order').each((i, element) => {
    
                    if(selector(element).find('i').attr('class') != 'fa fa-thumb-tack c-icon-fixed') {
                        currentUrl = selector(element).find('a').attr('href');
                        //console.log(currentUrl);
                        return false;
                    }else{
                        console.log(" === no " + selector(element).find('i').attr('class') );
                    }
                });
    
                isNew(lastUrl, currentUrl)
                lastUrl = currentUrl;
    
                console.log('-'.repeat(50));
            }
            
            setTimeout(run, 60000);
        }catch(e){
            console.log("Error in startPars: " + e)
            setTimeout(run, 60000);
        }
    }, 60000);
}

function isNew(oldUrl, newUrl){
    if(oldUrl === newUrl){
        console.log(' oldUrl === newUrl ');
        
    }else{
        console.log(lastUrl)
        console.log(' oldUrl != newUrl ');
        bot.telegram.sendMessage(user_id, newUrl)
    }
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
startParse()
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>