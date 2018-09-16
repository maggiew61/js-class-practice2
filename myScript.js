// import { sum } from './lib.js';
//
// console.log( sum(1,2,3,4) ); // 10

import {company} from './company.js'
// console.log('company is',company)
import HRSystemModel from './model/HRSystemModel.js'
class HRSystemController {
    constructor(aaa, bbb) { //why we need construcotor and why no return and ojbect; https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS
        this.model = aaa //是let model
        this.view = bbb
    }
    // This binding is necessary to make `this` work in the callback
    preData() { //需要這個做資料前處理
        return this.model.getData()
    }
    init() {
        const data = this.preData()
        this.view.init(data)
    }
}
class HRSystemView{
  init(data){
    this.recommendationNumber()
    this.filterContent(data)
    this.addListner()
  }
  //'產品類別'選單內容
  filterContent(data){
    const filterArray = Object.keys(data)
      for (let i in filterArray) {
          var node = document.createElement("OPTION");
          var textnode = document.createTextNode(filterArray[i]);
          node.appendChild(textnode);
          document.getElementById("test").appendChild(node);
      }
  }
  // 幾筆推薦公司, 預設顯示為０
  recommendationNumber(){
    const lengthArr = ['hiLength', 'meLength', 'loLength']
    for (let i in lengthArr) {
        let number = lengthArr[i]
        document.getElementById(number).textContent = 0
    }
  }
  addListner(){
    let accordionHead = document.getElementsByClassName('accordionHead')
    console.log('accordionHead is', accordionHead.length)
    for (let i =0; i< accordionHead.length; i++){
      console.log('accordionHeadtypeof  is',typeof accordionHead[i])
      // if(accordionHead[i] === 3)break
      // accordionHead[i].addEventListener("click", this.toggleItem.bind(this))
      accordionHead[i].addEventListener("click", this.toggleItem)
    }
  }
  toggleItem(e){
        e.stopPropagation()
        let className = this.nextElementSibling.className //= this.parentNode.className
        // let className = e.target.nextElementSibling.className //= this.parentNode.className
        for (let j in content) {
          if(content[j] === 3)break
            content[j].className = 'accordionContent close';
        }
        if (className === 'accordionContent close') {
            e.target.nextElementSibling.className = 'accordionContent open'
        }

  }
}
const HRModel = new HRSystemModel(hrData)
const HRView = new HRSystemView()
const HRController = new HRSystemController(HRModel, HRView) //feed model's data to controller
HRController.init()


    //打開關起功能
    const content = document.getElementsByClassName('accordionContent')

    let filterResponse = ''

    //顯示 推薦客戶的list
    function showCompanyList() {
        //清空上一筆資料
        document.getElementById("high").textContent = ''
        document.getElementById("medium").textContent = ''
        document.getElementById("low").textContent = ''



        let a = document.getElementById("test").value
        filterResponse = a

        let hiLength = dataJson[filterResponse].list.hi.length
        let meLength = dataJson[filterResponse].list.me.length
        let loLength = dataJson[filterResponse].list.lo.length
        document.getElementById('hiLength').textContent = hiLength
        document.getElementById('meLength').textContent = meLength
        document.getElementById('loLength').textContent = loLength


        //抓資料出來
        let high = filterResponse in dataJson ? dataJson[filterResponse].list.hi : null
        let medium = filterResponse in dataJson ? dataJson[filterResponse].list.me : null
        let low = filterResponse in dataJson ? dataJson[filterResponse].list.lo : null

        for (let i in high) {
            var node = document.createElement("DIV");
            var textnode = document.createTextNode(high[i]);

            //add id attribtue
            // https://stackoverflow.com/questions/19625646/javascript-adding-an-id-attribute-to-another-created-element
            node.setAttribute("id", "testid");
            node.setAttribute("style", "cursor:pointer");
            node.appendChild(textnode);

            //add onclick event to customer list
            // https://stackoverflow.com/questions/13915702/adding-event-listeners-to-multiple-elements
            node.addEventListener("click", CustomerProfile)
            document.getElementById("high").appendChild(node);
        }

        for (let i in medium) {
            var node = document.createElement("DIV");
            var textnode = document.createTextNode(medium[i]);
            node.setAttribute("id", "testid");
            node.setAttribute("style", "cursor:pointer");
            node.appendChild(textnode);
            node.addEventListener("click", CustomerProfile)
            document.getElementById("medium").appendChild(node);
        }

        for (let i in low) {
            var node = document.createElement("DIV");
            node.setAttribute("style", "cursor:pointer");
            var textnode = document.createTextNode(low[i]);
            node.setAttribute("id", "testid");
            node.appendChild(textnode);
            node.addEventListener("click", CustomerProfile)
            document.getElementById("low").appendChild(node);
        }
    }

    let profile = ''
    let similarContent

    function CustomerProfile(e) {
        let filterChoice = filterResponse
        let a = e.target.textContent //get the textcontent of element clicked
        profile = a in dataJson[filterResponse].profile ? dataJson[filterResponse].profile[a] : null
        //把資料放進 客戶畫像 裡面
        document.getElementById('level').textContent = profile.level
        document.getElementById('id').textContent = `ID:${profile.id}`

        // 把資料放進組織型態那一區
        showCustomer('basic')
        showCustomer('similar')

        document.getElementById('newsTest').textContent = '' //先清空上一筆
        let news = profile.news
        let div
        for (let i in news) { //5筆
            let node = document.createElement("DIV"); //create an element
            // let textnode = document.createTextNode(news[i]); //create text
            // node.appendChild(textnode); //append text to the element

            //test
            div = document.createElement("DIV")
            div.setAttribute("id", "testBorder")

            let title = document.createElement("DIV")
            title.setAttribute("id", "marginBelow")
            let text = `${news[i][0]}`
            title.innerHTML = text

            let content = document.createElement("DIV")
            let contentText = `${news[i][1]}`
            content.innerHTML = contentText

            div.appendChild(title)
            div.appendChild(content)
            //test
            document.getElementById("newsTest").appendChild(div); //append the element to html page
        }

    }

    //display '客戶畫像' contents
    function showCustomer(e) {
        document.getElementById(e).textContent = '' //先清空上一筆
        document.getElementById('titleBetween').textContent = '相似公司' //先清空上一筆
        document.getElementById('titleNews').textContent = '產訊新聞' //先清空上一筆

        let companyInfo = Object.keys(profile[e]) //profile底下的下一層選項的'basic'或'similar'底下的東西

        let basicTitle = ['組織型態：', '創立時間：', '行業：', '主要產品：']
        similarTitle = Object.keys(profile.similar)
        similarContent = profile.similar

        // <div>first then append sth inside
        for (let i in companyInfo) {
            let title = e === 'basic' ? basicTitle : similarTitle
            let p
            let div
            let info
            let key = companyInfo[i]
            for (let j in title) {

                if (e === 'basic') {
                    // test
                    //div elements to hold the two divs inside
                    div = document.createElement("DIV")
                    div.setAttribute("id", "testStyle")

                    //test
                    divChild = document.createElement("DIV")
                    divChild.setAttribute("id", "testStyle2")
                    let before = `${title[i]}`
                    divChild.innerHTML = before


                    p = document.createElement("P")
                    let keyValue = profile[e][key]
                    let text = `${keyValue}`
                    p.innerHTML = text

                    div.appendChild(divChild)
                    div.appendChild(p)

                } else {
                    // test
                    //div elements to hold the two divs inside
                    div = document.createElement("DIV")
                    div.setAttribute("id", "similarStyle")


                    //add info text
                    info = document.createElement("SPAN")
                    info.setAttribute("id", "info")
                    let text = profile[e][title[i]]
                    info.innerHTML = text



                    //test
                    divChild = document.createElement("SPAN")
                    divChild.setAttribute("id", "similarId")
                    let before = `${title[i]}`
                    divChild.innerHTML = before

                    //add event listener
                    divChild.addEventListener("mouseover", showCoords)
                    divChild.addEventListener("mouseout", disappear)


                    let iNode = document.createElement("I")
                    iNode.setAttribute("class", "fas fa-info-circle")
                    divChild.appendChild(iNode)

                    div.appendChild(divChild)
                    // div.appendChild(iNode)
                    div.appendChild(info)

                }
            }
            document.getElementById(e).appendChild(div) //append the element to html page
        }

    }
    //tooptip內容與位置
    function showCoords(e) {
        //tooltip位置
        let x = e.clientX
        let y = e.clientY
        let info = document.getElementById('info')
        info.style.visibility = 'visible'
        info.style.left = calc(x)
        info.style.top = calc(y)

        //硬幹,為了讓info icon也有字跑出
        let parent = e.target.parentElement
        info.textContent = parent.nodeName === 'SPAN' ?
            similarContent[parent.textContent] //tooptip內容
            :
            similarContent[e.target.textContent] //tooptip內容

    }
    const calc = (n) => `${n + 8}px`

    //mouseout時讓tooptip消失
    function disappear() {
        document.getElementById('info').style.visibility = 'hidden'
    }
