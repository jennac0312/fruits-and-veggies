import React from 'react'

const Show = ( { type, foods } ) => {

  return (
    <div>
        <a href="/">Return</a>
        <h1>
            SHOW ALL { type.toUpperCase() }
        </h1>
        <a href={`/${type}/new`}>Add New { type.toUpperCase() }</a>

            { foods.map((food, index) => {
                return (
                    <>
                <a href={`/${type}/${food._id}`} style={{ textDecoration: "none"}}>
                    {/* NAME :  href={`/${type}/${food.name}`} */}
                    {/* ID :  href={`/${type}/${food._id}`} */}
                    <ol key={index}> 
                        <l1 style={{ display:"block"}}><span style={ { fontWeight: "bold", color:"crimson" }}>Name: </span>{food.name}</l1>
                        <l1 style={{ display:"block"}}><span style={ { fontWeight: "bold", color:"crimson" }}>Color: </span>{food.color}</l1>
                        <l1 style={{ display:"block"}}><span style={ { fontWeight: "bold", color:"crimson" }}>Ready To Eat: </span>{String(food.readyToEat)}</l1>
                    </ol>
                </a>
                <form action={`/${type}/${food._id}?_method=DELETE`} method='POST'>
                    <button>DELETE</button>
                </form>
                <hr />
                </>
                )
            }) } 
    </div>
  )
}

export default Show
