const headerCheck = async (req, res, next) => {
    const header = req.headers.isfreeappuser
    if(header){
        if(header === "true")
        req['isFreeAppUser'] = true
        if(header === "false")
        req['isFreeAppUser'] = false
    next()
    }
    else res.send({msg: "An usefull header is missing"})
}

module.exports = {headerCheck}






// const mid4= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid4")
//     //counter
//     next()
// }

// module.exports.mid1= mid1
// module.exports.mid2= mid2
// module.exports.mid3= mid3
// module.exports.mid4= mid4
