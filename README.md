# bookraider
Looks for audiobooks by given name, and then downloads thme and processes then for use on audiobook player.
It searches the given audiobook fonr fulllenghtaudiobooks.com and from goldenaudiobooks.com. Then it will show all the names of the book, that it found. the audiobooks.

'![fisrt](https://user-images.githubusercontent.com/47357440/215519791-b4d5de7f-6221-4d9e-984f-9b01524cb29d.png)
This is how the page looks when you first and on it. To get forward, input hte book name and press find,.

![search](https://user-images.githubusercontent.com/47357440/215519844-2d0dca29-83db-4049-af9d-3fb184d6fa27.png)
This is how the pager looks, when it is searching for the book online.

![final](https://user-images.githubusercontent.com/47357440/215519881-4c1586f2-40ca-48cf-9000-1b4a7fa226ff.png)
And this is how it looks, after it has found the book. If you press on the name, it will open a link to the site, from where it foun the audiobook, and if you press the get button, it will start downloading and prosessing 

# Api
/api/find 
-------------
finds the book that it is given. It takes in json in the post request body, that is formatet as follows: {"book": name, "Author": author}. both of these can be gven text values, or left as an empty string. It will return json list, that has the names of the books it has found, and the link to the corresponing site. 

# Commands
To run localy , use Npm start command in backend folder. If you have made changes in the react forntend, first build it using npm run build in react folder, aand add the resulting build folder to backend folder. To build into a docker image, use npm run build in backend.
