import React from 'react'

const Name = ( { type, food } ) => {
  return (
    <div>
        <a href={`/${type}`}>Return</a>
        <h1>NAME PAGE</h1>
        { food.map((food, index) => {
            return (
                <ol key={index}> 
                    <l1 style={{ display:"block"}}><span style={ { fontWeight: "bold", color:"crimson" }}>Name: </span>{food.name}</l1>
                    <l1 style={{ display:"block"}}><span style={ { fontWeight: "bold", color:"crimson" }}>Color: </span>{food.color}</l1>
                    <l1 style={{ display:"block"}}><span style={ { fontWeight: "bold", color:"crimson" }}>Ready To Eat: </span>{String(food.readyToEat)}</l1>
                    <hr />
                </ol>    
            )
      })  }
    </div>
  )
}

export default Name
