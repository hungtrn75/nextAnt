import gql from 'graphql-tag'
export const BorderAllQuery = gql` 
             query  BorderAllQuery{
              BorderAllQuery{
                Title
                Content
              }
  }
 
`



export const BorderOneQuery = gql`
      query BorderOneQuery($boradId:String){
            BorderOneQuery(boradId:$boradId) {
                        boradId
                        name
                        tel 
                        nickName
                        }
      }
`


export const BorderUpdate = gql`
      mutation BorderUpdate($name:String,$tel:String,$nickName:String,$boradId:String) {
            BorderUpdate(name:$name,tel:$tel,nickName:$nickName,boradId:$boradId) 
                     {
                        boradId
                        name
                        tel 
                        nickName
                        }
      }      
`

export const BorderDelete = gql`
      mutation BorderDelete($boradId:String) {
            BorderDelete(boradId:$boradId) 
                     {
                        boradId
                        name
                        tel 
                        nickName
                        }
      }      
`

export const BorderAdd = gql`
      mutation BorderAdd($name:String,$tel:String,$nickName:String) {
            BorderAdd(name:$name,tel:$tel,nickName:$nickName) 
                     {
                        boradId
                        name
                        tel 
                        nickName
                        }
      }      
`