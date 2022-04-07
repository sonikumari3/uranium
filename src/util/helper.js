let printDate = function(){
let currentDate =new Date()
console.log (currentDate)
}
module.exports.myDate = printDate;

let printMonth = function(){
    let currentDate =new Date()
    console.log (currentDate.getMonth() + 1)

}
module.exports.mymonth = printMonth;
let  getBatchInfo =  function(){
   
    console.log (' Uranium, w2D4, the topic for today is Nodejs module system')

}  
module.exports.mybatch = getBatchInfo