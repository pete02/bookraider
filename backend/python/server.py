from bs4 import BeautifulSoup, BeautifulStoneSoup
import requests
from flask import *
from flask_cors import CORS
import time
import os
app =Flask(__name__)
CORS(app)


@app.route('/',methods=['GET'])
def home_page():
    return "json_dump"


@app.route('/get_book',methods=['GET']) 
def get():
    start=time.time()
    print(os.getcwd())
    url=str(request.args.get('link'))
    if len(url) >0:
        print(url)
        doc=requests.get(url,headers={'User-Agent': 'Mozilla/5.0'},timeout=3)
        if doc.status_code ==200:
            soup = BeautifulSoup(doc.content, "lxml")
            links = []
            for link in soup.findAll('a'):
                if("mp3" in link.get('href')):
                    doc=requests.get(link.get("href"))
                    if doc.status_code ==200:
                        if 'l' in locals():
                            l=l+(doc.content)
                        else:
                            l=doc.content
            book=url.split("/")[3]
            if 'l' in locals():
                book=book.replace("-"," ")
                book=book.replace("+"," ")
                with open("mp3s/"+book+".mp3",'wb') as f:
                    f.write(l)
                end=time.time()
                print(f"time:{end-start}")
                return "done"
            else: return "loading error"
        else: return "http error"
    else: return "no book given"


@app.route('/search_book',methods=['GET'])  
def search():
    print("search")
    book=str(request.args.get('book'))
    if len(book) >0:
        l=fullaudiobook(book)
        if(l=="not_found"):
            print("searching golden audiobooks")
            l=goldenaudiobook(book)
        return l
    else: return "no book given"

def fullaudiobook(fbook):
    doc=requests.get("https://fulllengthaudiobooks.com/?s="+fbook,headers={'User-Agent': 'Mozilla/5.0'},timeout=3)
    if doc.status_code ==200:
        soup = BeautifulSoup(doc.content, "lxml")
        return find(fbook,soup.findAll('a'))
    else:
        print(doc.status_code) 
        return "http error"
     

def goldenaudiobook(gbook):
    gbook=gbook.replace(" ","+")
    print(gbook)
    doc=requests.get("https://goldenaudiobooks.com/?s="+gbook,headers={'User-Agent': 'Mozilla/5.0'},timeout=10)
    if doc.status_code ==200:
        soup = BeautifulSoup(doc.content, "lxml")
        return find(gbook.replace("+"," "),soup.findAll('a'))
    else:
        print(doc.status_code) 
        return "http error"

def find(book,links):
    best="none"
    score=0
    for link in links:
        link=link.get('href')
        l=0
        for b in book.split(" "):
            if b in link:
                l+=1    
        if l>score:
            score=l
            best=link
    print(score)
    if len(book.split(" "))-score<=2:
        return best
    else:
        return "not_found"


if __name__ =='__main__':
    app.run(port=3333,debug=True,host="0.0.0.0")

