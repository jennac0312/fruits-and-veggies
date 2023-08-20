import React from 'react'

const New = ( { type } ) => {

    
  return (
    <div>
        <h1>New {type.toUpperCase()} page</h1>
            <form action={`/${type}`} method="POST">
                Name: <input type="text" name="name" /><br/>
                Color: <input type="text" name="color" /><br/>
                Is Ready To Eat: <input type="checkbox" name="readyToEat" /><br/>
                <input type="submit" name="" value={`Create ${type}`}/>
            </form>
    </div>
  )
}

export default New
