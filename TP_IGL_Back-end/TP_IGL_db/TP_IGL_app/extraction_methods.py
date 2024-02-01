from unidecode import unidecode
import spacy
import re
import fitz
from pdftitle import get_title_from_file
def extract_title(path):
  title=get_title_from_file(path)
  return title

def findWholeWord(w):
    return re.compile(r'\b({0})\b'.format(w), flags=re.IGNORECASE).search

def extract_info(path,word):
  doc=fitz.open(path)
  if word=='keywords' or word=='abstract':
    page = doc.load_page(0) 
    dl = page.get_displaylist()
    tp = dl.get_textpage()
    tp_text=tp.extractText()
    txt=re.split('\n\d+.+[ \t][a-zA-Z].+\n',tp_text)
    ref=''
    for i in txt :
        find=findWholeWord(f'{word}')(i)
        if find is not None :
            ref=i
    refrence=ref.splitlines()
    the_references=[]
    k=int()
    if word=="abstract":
        french_word="résumé"
    else:
        french_word="mots clés"
    for i in range(len(refrence)):
        find_eng=findWholeWord(f'{word}')(refrence[i])
        find_fr=findWholeWord(f'{french_word}')(refrence[i])
        if (find_eng is not None) or (find_fr is not None) :
            k=i
            break
    i=k
    m=len(refrence)
    if word=="abstract":
        oposit_word="keywords"
        while (i<m  and(findWholeWord(f'{oposit_word}')(refrence[i]) is None)and(findWholeWord('introduction')(refrence[i]) is None) and (findWholeWord('CCS CONCEPTS')(refrence[i]) is None)and (findWholeWord('index terms')(refrence[i]) is None)):
            the_references.append(refrence[i])
            i+=1
    else:
        oposit_word="abstract"
        while (i<m  and(findWholeWord(f'{oposit_word}')(refrence[i]) is None)and(findWholeWord('introduction')(refrence[i]) is None) and (findWholeWord('CCS CONCEPTS')(refrence[i]) is None)):
            the_references.append(refrence[i])
            i+=1
    my_references="\n".join(the_references)
    #print(my_references)
    return my_references
  elif word=='references':
    n=0
    refe=''
    for i in range(len(doc)):
        page = doc.load_page(i)
        dl = page.get_displaylist()
        tp = dl.get_textpage()
        tp_text=tp.extractText()
        txt=re.split('\n\d+.+[ \t][a-zA-Z].+\n',tp_text)
        for j in txt:
            #print(j)
           # print("**************************************************")
            find=findWholeWord(f'{word}')(j)
            if find is not None :
               refe=j
               #print(refe)
               n=i+1
               break
    #print(refe)
    refrence=refe.splitlines()
    the_references=[]
    #print(refrence)
    k=int()
    for l in range(len(refrence)):
        find_eng=findWholeWord(f'{word}')(refrence[l])
        find_fr=findWholeWord('références')(refrence[l])
            #print(refrence[l])
        if (find_eng is not None) or (find_fr is not None) :
            k=l
            #print(refrence[k:])
            #print(k)
            break
    l=k
    #print(l)
    the_references=refrence[l:]
    #print(the_references)
    my_references="\n".join(the_references)
    #while(n<len(doc)):
       # page = doc.load_page(i)
       # dl = page.get_displaylist()
       # tp = dl.get_textpage()
       # tp_text=tp.extractText()
       # txt=re.split('\n\d+.+[ \t][a-zA-Z].+\n',tp_text)
        #print(txt)
       # for z in txt:
           #print(z)
        #   my_references+="\n"+z 
       # n+=1
    return my_references
  
def extract_article(my_path):
    text=""
    output = []
    doc = fitz.open(my_path)
    for page in doc:
        output += page.get_text("blocks")
    previous_block_id = 0 # Set a variable to mark the block id
    for block in output:
        if block[6] == 0: # We only take the text
             if previous_block_id != block[5]: # Compare the block number 
                 text+="\n"+unidecode(block[4])
    return text
def extract_entities(article_text,authors,orgs):
    nlp=spacy.load('en_core_web_lg')
    doc=nlp(article_text)
    for ent in doc.ents:
        if ent.label_=='ORG':
            orgs.append(ent.text)
        if ent.label_=='PERSON':
            authors.append(ent.text)

def extract_entities_from_pdf(path):
    auteurs=[]
    institutions=[]
    
    
    
    
    
    return auteurs,institutions
#auth,ins=extract_entities_from_pdf(my_path)
#print(ins)
#print(refer)