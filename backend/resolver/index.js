var User = require('./user')
var Border = require('./border')
//var UploadRes require( './FileResolver')
var { merge } = require("lodash")

let OutIndex = merge(User, Border);
let AllResolve = [OutIndex.Query, OutIndex.Mutation];

//let AllResolve = [OutIndex.Query];
//console.log(AllResolve)
module.exports = AllResolve