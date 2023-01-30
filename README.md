# bookraider
Looks for audiobooks by given name, and then downloads thme and processes then for use on audiobook player.
It searches the given audiobook fonr fulllenghtaudiobooks.com and from goldenaudiobooks.com. Then it will show all the names of the book, that it found. the audiobooks.
![fisrt](https://user-images.githubusercontent.com/47357440/215517379-8ec5ce29-6bb4-43ec-bc36-4ec5827b26f1.png)
This is how the page looks when you first and on it. To get forward, input hte book name and press find,.

![searching](https://user-images.githubusercontent.com/47357440/215517653-49fcfd70-fa09-40f1-9aee-2278ba7cdb7e.png)
This is how the pager looks, when it is searching for the book online.

![final](https://user-images.githubusercontent.com/47357440/215517798-86d6351a-7991-40cc-b799-74c379337c63.png)
And this is how it looks, after it has found the book. If you press on the name, it will open a link to the site, from where it foun the audiobook, and if you press the get button, it will start downloading and prosessing 

# Api
/api/find 
-------------
finds the book that it is given. It takes in json in the post request body, that is formatet as follows: {"book": name, "Author": author}. both of these can be gven text values, or left as an empty string. It will return json list, that has the names of the books it has found, and the link to the corresponing site. 

# Commands
To run localy , use Npm start command in backend folder. If you have made changes in the react forntend, first build it using npm run build in react folder, aand add the resulting build folder to backend folder. To build into a docker image, use npm run build in backend.
