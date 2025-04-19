from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import re
from typing import List, Optional

app = FastAPI(title="VietLearn API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WordDefinition(BaseModel):
    word: str
    definitions: List[str]
    pronunciation: Optional[str]
    examples: List[str]
    part_of_speech: Optional[str]

async def fetch_wiktionary_content(word: str) -> str:
    url = f"https://en.wiktionary.org/w/api.php"
    params = {
        "action": "parse",
        "page": word,
        "format": "json",
        "prop": "wikitext",
        "section": 0
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        data = response.json()
        
        if "error" in data:
            raise HTTPException(status_code=404, detail="Word not found")
            
        return data["parse"]["wikitext"]["*"]

def parse_wiktionary_content(content: str) -> WordDefinition:
    # Basic regex patterns for Vietnamese section
    vietnamese_section = re.search(r"==Vietnamese==.*?(?===|\Z)", content, re.DOTALL)
    if not vietnamese_section:
        raise HTTPException(status_code=404, detail="No Vietnamese entry found")
        
    text = vietnamese_section.group(0)
    
    # Extract pronunciation
    pronunciation = re.search(r"{{IPA\|vi\|(.*?)}}", text)
    pronunciation = pronunciation.group(1) if pronunciation else None
    
    # Extract definitions
    definitions = []
    for line in text.split("\n"):
        if line.startswith("# "):
            definition = re.sub(r"\{\{.*?\}}", "", line[2:])
            definition = re.sub(r"\[\[|\]\]", "", definition)
            if definition:
                definitions.append(definition.strip())
    
    # Extract examples
    examples = []
    for line in text.split("\n"):
        if line.startswith("#: "):
            example = re.sub(r"\{\{.*?\}}", "", line[3:])
            example = re.sub(r"\[\[|\]\]", "", example)
            if example:
                examples.append(example.strip())
    
    # Extract part of speech
    pos_match = re.search(r"===(\w+)===", text)
    part_of_speech = pos_match.group(1) if pos_match else None
    
    return WordDefinition(
        word=word,
        definitions=definitions,
        pronunciation=pronunciation,
        examples=examples,
        part_of_speech=part_of_speech
    )

@app.get("/api/lookup/{word}")
async def lookup_word(word: str) -> WordDefinition:
    """
    Look up a Vietnamese word in Wiktionary and return its definition,
    pronunciation, examples, and part of speech.
    """
    try:
        content = await fetch_wiktionary_content(word)
        return parse_wiktionary_content(content)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    """
    Health check endpoint to verify the API is running.
    """
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
