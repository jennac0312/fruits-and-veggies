import React from 'react'

const Default = ( props, { title } ) => {
  return (
    <div>
        <html>
            <head><title>{title}</title></head>
                <body>
                    <h1>{title}</h1>
                    {props.children}
                </body>
        </html>
    </div>
  )
}

export default Default
