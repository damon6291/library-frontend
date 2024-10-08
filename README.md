# Front-End

## How to run front-end

Add .env file to the project. Look at the env.example. Change the REACT_APP_API_URL as accordingly.
Or simply edit config.js to have the correct API_URL.
Run this file in visual studio code. Run debug.

## Features

User can be created with roles.
Customer cannot see librarian pages.
Book can be searched. When clicking specific book, it will direct to the detail page. When simply clicking enter, it will direct to the detail search page.
Book can be upserted and deleted.
Book can be borrowed and returned.
Review can be written.

## Improvements

It took me 20 + hours to make this project. I took out features images in the front end due to time constraint.

If I explain verbally, I would use react dropzone to make a dropzone for images. This will take images and send multi part form data request to the backend.

I could add paginations and more filters for searching books.

Adding more review information could be helpful as well.

Clicking on category or author could trigger search.

There are lots of components and files that are not used for this project. These could be potentially used when developing more.

If there was a designer to design this project, it would have much better result!

I am using many duplicate codes to make it quick. I will probably create a book component so I don't need to repeate it multiple times.

Warnings for setParams are for paginations. It would be good to have paginations because currently project is only getting certain amount of results.
