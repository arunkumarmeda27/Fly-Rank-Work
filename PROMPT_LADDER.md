# Prompt Ladder — From Vague to Engineered

**Context**: Arun Kumar Meda · Fly Rank Capstone Track · FE-04  
**Domain**: Backend API development (FastAPI + Python)  
**Baseline starting point**: A prompt I would have typed before this course.

---

## 🪜 The Ladder at a Glance

| Version | Layer Added | One-sentence change |
| :--- | :--- | :--- |
| **Baseline** | — | "Write backend code" |
| **V1** | Clearer goal | What kind of code, what it does |
| **V2** | Real context | Existing tech stack, schema, and project |
| **V3** | Output format | Exact file and structure expectations |
| **V4** | Constraints | Boundaries on libraries, error codes, scope |
| **V5** | Verification requirements | Ask it to write tests and run them mentally |

---

## 🟥 Baseline — "Write backend code"

### The Prompt
```
Write backend code.
```

### Representative Output Excerpt
> "Sure! Here's a simple backend example using Node.js and Express:
>
> ```javascript
> const express = require('express');
> const app = express();
> app.use(express.json());
>
> app.get('/', (req, res) => {
>   res.send('Hello World');
> });
>
> app.listen(3000, () => {
>   console.log('Server running on port 3000');
> });
> ```
>
> This sets up a basic REST API server. You can add routes for your data."

### Notes
| | |
|:---|:---|
| **What changed in the prompt** | Nothing — this is the baseline. |
| **What improved in the output** | Nothing. The output is a Hello World Express stub that has no relationship to any real task. |
| **What still failed** | Everything. Wrong language (Node.js instead of Python/FastAPI), no schema, no route logic, no real usefulness. It guessed the stack incorrectly and defaulted to the most common tutorial pattern it knows. |
| **What I'd try next** | Name the actual goal — what the endpoint must do and return. |

---

## ✅ V1 — Layer: Clearer Goal

### What changed in the prompt
Added: what the endpoint must do (update a user profile), what method (PATCH), and what it returns.

### The Prompt
```
Write a PATCH endpoint that accepts a user profile update (name, email) and returns the
updated profile as JSON.
```

### Representative Output Excerpt
> ```python
> from fastapi import FastAPI
> from pydantic import BaseModel
>
> app = FastAPI()
>
> class UserProfile(BaseModel):
>     name: str
>     email: str
>
> @app.patch("/profile")
> async def update_profile(profile: UserProfile):
>     # In a real app, save to database here
>     return {"name": profile.name, "email": profile.email}
> ```

### Notes
| | |
|:---|:---|
| **What changed in the prompt** | Added a specific goal: PATCH, fields, return type. |
| **What improved in the output** | It switched to FastAPI + Pydantic automatically (correct stack inference), defined a data model, and produced a runnable endpoint skeleton. The Hello World noise is gone. |
| **What still failed** | It has no validation beyond Pydantic's basic type checks. Name could be an empty string or a SQL injection payload — the model added no rules. The `# save to database here` comment is a placeholder with zero guidance on how. |
| **What I'd try next** | Add real project context: the existing Pydantic schema, validation constraints, and the database layer in use. |

---

## ✅ V2 — Layer: Real Context

### What changed in the prompt
Added: the actual tech stack (FastAPI, Pydantic v2, SQLite via `aiosqlite`), the existing `UserProfile` Pydantic model, and the existing `db.update_user()` function signature.

### The Prompt
```
I'm building a FastAPI backend for a portfolio project. The stack is: FastAPI, Pydantic v2,
SQLite via aiosqlite. I have an existing Pydantic model:

  class UserProfile(BaseModel):
      name: str = Field(..., min_length=2, pattern=r"^[a-zA-Z\s]+$")
      email: EmailStr
      notifications: bool = False

I also have an async function `await db.update_user(user_id: int, data: dict) -> dict`
that runs the UPDATE query and returns the updated row.

Write a PATCH /profile/{user_id} endpoint that accepts a UserProfile body,
calls db.update_user(), and returns the updated profile as JSON.
```

### Representative Output Excerpt
> ```python
> from fastapi import APIRouter, HTTPException
> from pydantic import BaseModel, Field, EmailStr
>
> router = APIRouter()
>
> class UserProfile(BaseModel):
>     name: str = Field(..., min_length=2, pattern=r"^[a-zA-Z\s]+$")
>     email: EmailStr
>     notifications: bool = False
>
> @router.patch("/profile/{user_id}", response_model=UserProfile)
> async def update_profile(user_id: int, profile: UserProfile):
>     updated = await db.update_user(user_id, profile.model_dump())
>     if not updated:
>         raise HTTPException(status_code=404, detail="User not found")
>     return updated
> ```

### Notes
| | |
|:---|:---|
| **What changed in the prompt** | Pasted the real existing model and function signature instead of describing them abstractly. |
| **What improved in the output** | It used `APIRouter` instead of the app-level `@app.patch`, matching the pattern of a larger modular app. It used `profile.model_dump()` (Pydantic v2 syntax, not `.dict()` which is deprecated). It added a 404 guard. The model's `Field` constraints carried over from context — it didn't invent its own. |
| **What still failed** | It imported `db` without showing where it comes from. There's no error handling for database exceptions (what if `db.update_user` throws?). The `response_model=UserProfile` means passwords or internal fields could leak if the schema ever changes. |
| **What I'd try next** | Specify the exact output format: which file this belongs in, what to import, and how errors should be shaped. |

---

## ⚠️ V3 — Layer: Output Format ← **"This made it worse"**

### What changed in the prompt
Added: explicit output format instructions — "Return only the route file, no explanations, with a `# routes/profile.py` header."

### The Prompt
```
[Same as V2, plus:]

Return the response as a single Python file. Start with the comment `# routes/profile.py`.
Include all imports. No explanations outside the code block.
```

### Representative Output Excerpt
> ```python
> # routes/profile.py
> from fastapi import APIRouter, HTTPException, Depends
> from pydantic import BaseModel, Field
> from pydantic import EmailStr
> from typing import Optional
> from database import get_db
> from models import UserProfile
>
> router = APIRouter()
>
> @router.patch("/profile/{user_id}")
> async def update_profile(user_id: int, profile: UserProfile, db=Depends(get_db)):
>     updated = await db.update_user(user_id, profile.model_dump())
>     if not updated:
>         raise HTTPException(status_code=404, detail="User not found")
>     return updated
> ```

### Notes
| | |
|:---|:---|
| **What changed in the prompt** | Added an explicit output format: one file, comment header, all imports, no prose. |
| **What improved in the output** | The file structure is immediately copy-pasteable. Imports are complete. |
| **What still failed** | **This version made things worse in one specific way**: the model invented `from database import get_db` and `from models import UserProfile` — module paths that don't exist in my project. By asking for a self-contained file, I pushed it to invent missing infrastructure. In V2, the placeholder `db` was at least honest about being incomplete. Here, the hallucinated imports would cause an `ImportError` the moment someone copied the file. The format constraint traded accuracy for tidiness. |
| **What I'd try next** | Add explicit constraints: which modules exist, what to assume, and what error shapes to use — not just how to format the file. |

---

## ✅ V4 — Layer: Constraints

### What changed in the prompt
Added: explicit constraints — no ORMs, no invented module names, error responses must use a consistent `{"error": "..."}` JSON shape, and only use stdlib + FastAPI + Pydantic.

### The Prompt
```
[Same as V2, plus:]

Constraints:
- Do not invent module paths. Assume `db` is already in scope as a passed argument or dependency.
- Do not use SQLAlchemy or any ORM.
- All HTTPException detail values must follow this shape: {"error": "message string"}.
- Only import from: fastapi, pydantic, typing. No other third-party imports.
- Use Pydantic v2 syntax: .model_dump() not .dict().

Return the route function only, not a full file. I'll assemble the imports myself.
```

### Representative Output Excerpt
> ```python
> @router.patch("/profile/{user_id}", response_model=UserProfile)
> async def update_profile(user_id: int, profile: UserProfile, db: AsyncDatabase):
>     try:
>         updated = await db.update_user(user_id, profile.model_dump())
>     except RecordNotFoundError:
>         raise HTTPException(status_code=404, detail={"error": "User not found"})
>     except DatabaseError as e:
>         raise HTTPException(status_code=500, detail={"error": str(e)})
>     return updated
> ```

### Notes
| | |
|:---|:---|
| **What changed in the prompt** | Listed explicit constraints on imports, error shapes, ORM use, and scope assumptions. |
| **What improved in the output** | The hallucinated imports are gone. Error handling now covers both 404 and 500 paths. The `{"error": "..."}` shape is consistent. The `try/except` block is real defensive code, not a placeholder comment. |
| **What still failed** | `RecordNotFoundError` and `DatabaseError` are still invented exception names — it doesn't know what my `db` layer raises. I'd need to tell it. |
| **What I'd try next** | Add verification requirements: ask it to list every assumption it made, so I can audit them before copying the code. |

---

## ✅ V5 — Layer: Verification Requirements

### What changed in the prompt
Added: "After writing the function, list every assumption you made as numbered items. Flag any item where you invented a name, type, or behaviour that I haven't confirmed."

### The Prompt
```
[Same as V4, plus:]

After the code, write a numbered list of every assumption you made while writing it.
For each assumption, mark it [CONFIRMED] if I stated it in this prompt, or [ASSUMED] if
you inferred or invented it. I will review ASSUMED items before using the code.
```

### Representative Output Excerpt
> ```python
> @router.patch("/profile/{user_id}", response_model=UserProfile)
> async def update_profile(user_id: int, profile: UserProfile, db: AsyncDatabase):
>     try:
>         updated = await db.update_user(user_id, profile.model_dump())
>     except Exception as e:
>         if "not found" in str(e).lower():
>             raise HTTPException(status_code=404, detail={"error": "User not found"})
>         raise HTTPException(status_code=500, detail={"error": "Database error"})
>     return updated
> ```
>
> **Assumptions:**
> 1. [CONFIRMED] `db.update_user(user_id, data)` is an async function returning a dict.
> 2. [CONFIRMED] Error detail shape is `{"error": "string"}`.
> 3. [ASSUMED] `AsyncDatabase` is the type hint for `db` — you haven't named the class.
> 4. [ASSUMED] I used a generic `except Exception` because you didn't tell me what exceptions `db.update_user` raises. I used string matching on the message, which is fragile.
> 5. [ASSUMED] `response_model=UserProfile` is safe — I assumed you want the full model back, not a subset.

### Notes
| | |
|:---|:---|
| **What changed in the prompt** | Asked it to self-audit by flagging every invented assumption. |
| **What improved in the output** | This was the single most useful change. The model voluntarily flagged that its `except RecordNotFoundError` from V4 was invented, replaced it with `except Exception`, and told me exactly why in the assumption list. I can now audit items 3, 4, and 5 before copy-pasting anything. The code review effort dropped from "read every line suspiciously" to "check three flagged items." |
| **What still failed** | The string-matching on `"not found"` in the error message (`if "not found" in str(e).lower()`) is genuinely fragile and it said so itself. This is an honest limitation, not a hallucination — but it's still a bug I'd need to fix by providing the real exception class name. |
| **What I'd try next** | Feed assumption #4 back in: specify the real exception class raised by `aiosqlite` (`sqlite3.IntegrityError`, `aiosqlite.OperationalError`) so the except clauses are accurate. |

---

## 🏁 Final Reusable Prompt

This is the cleaned, portable version. Replace the `[PLACEHOLDER]` values with your project's specifics. Someone else on your track should be able to use this without you in the room.

```
I'm building a FastAPI backend.

Stack: FastAPI, Pydantic v2, [YOUR DB LAYER — e.g. aiosqlite / asyncpg / SQLAlchemy async].

Existing Pydantic model (do not redefine it, reference it):
  [PASTE YOUR MODEL HERE]

Existing async DB function I'll pass in scope (do not invent its internals):
  await db.[FUNCTION](arg1: type, arg2: type) -> dict
  Raises: [LIST EXCEPTION CLASSES IT CAN RAISE, e.g. sqlite3.IntegrityError]

Task: Write a [METHOD] /[ROUTE]/{id} endpoint that:
  1. Accepts the model body above.
  2. Calls the DB function above.
  3. Returns the result as JSON.

Constraints:
  - Do not import any module I haven't listed above.
  - Do not use any ORM.
  - All HTTPException detail values must follow: {"error": "message string"}.
  - Use Pydantic v2 syntax (.model_dump(), not .dict()).
  - Return the route function only. No file scaffolding, no imports — I'll assemble those.

After the code, write a numbered assumption list:
  - Mark [CONFIRMED] for anything I stated above.
  - Mark [ASSUMED] for anything you inferred or invented.
  - I will fix every ASSUMED item before using the code.
```

---

## 📌 Key Takeaway

The most impactful single layer was **Verification Requirements (V5)**. Adding context (V2) produced better code. Adding constraints (V4) eliminated hallucinated imports. But asking the model to *self-audit its own assumptions* was the only change that made the review process itself faster — it turned "read every line defensively" into "check three flagged items." That is the real performance upgrade.
