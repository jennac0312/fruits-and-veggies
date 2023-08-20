import React from 'react'
// const DefaultLayout = require('../layouts/Default')
import DefaultLayout from './layouts/Default'


const Index = ( { type, food } ) => {


    return (
    <div>
        {/* <DefaultLayout title={`${type} Index Page`}> */}

            <a href={`/${type}`}>Return</a>
            <h1>INDEX PAGE FOR { food.name.toUpperCase() }</h1>
            {/* { food.map((food, index) => { */}
            {/* return ( */}
                <ol> 
                    <hr />
                    <l1 style={{ display:"block"}}><span style={ { fontWeight: "bold", color:"crimson" }}>Name: </span>{food.name}</l1>
                    <l1 style={{ display:"block"}}><span style={ { fontWeight: "bold", color:"crimson" }}>Color: </span>{food.color}</l1>
                    <l1 style={{ display:"block"}}><span style={ { fontWeight: "bold", color:"crimson" }}>Ready To Eat: </span>{String(food.readyToEat)}</l1>
                    <hr />
                </ol>    
            {/* )
            })  } */}
      {/* </DefaultLayout> */}
    </div>
  )
}

export default Index
