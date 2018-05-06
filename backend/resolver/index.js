var UserResolver = require('./user')
//var UploadRes require( './FileResolver')
var { merge } = require("lodash")

let OutIndex = merge(UserResolver);
//let AllResolve = [OutIndex.Query, OutIndex.Mutation];
let AllResolve = [OutIndex.Query];
//console.log(AllResolve)
module.exports = AllResolve