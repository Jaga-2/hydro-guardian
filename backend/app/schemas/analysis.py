from pydantic import BaseModel
from typing import List, Dict, Any


class AnalysisResponse(BaseModel):
    message: str
    rows: List[Dict[str, Any]]
