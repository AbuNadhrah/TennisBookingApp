from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import uuid

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this to your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================
# User Management
# ============================

class User(BaseModel):
    id: str
    name: str
    role: str  # e.g., player, coach, court_manager
    dob: datetime
    skill_level: Optional[str] = None
    preferences: Optional[List[str]] = None
    qualifications: Optional[str] = None
    experience: Optional[str] = None
    contact_info: Optional[str] = None

users_db = {}

@app.post("/users/")
def create_user(user: User):
    user.id = str(uuid.uuid4())
    users_db[user.id] = user
    return {"message": "User created successfully", "user": user}

@app.get("/users/")
def get_all_users():
    if not users_db:
        return {"message": "No users found"}
    return {"users": list(users_db.values())}

@app.put("/users/{user_id}")
def update_user(user_id: str, updated_user: User):
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    users_db[user_id] = updated_user
    return {"message": "User updated successfully", "user": updated_user}

@app.delete("/users/{user_id}")
def delete_user(user_id: str):
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    del users_db[user_id]
    return {"message": "User deleted successfully"}

# ============================
# Notifications and Reminders
# ============================

class Booking(BaseModel):
    id: str
    user_id: str
    session_time: datetime
    type: str  # e.g., "court_booking", "coaching_session"

bookings_db = {}

@app.post("/bookings/")
def create_booking(booking: Booking, background_tasks: BackgroundTasks):
    booking.id = str(uuid.uuid4())
    bookings_db[booking.id] = booking
    background_tasks.add_task(schedule_reminder, booking)
    return {"message": "Booking created successfully", "booking": booking}

def schedule_reminder(booking: Booking):
    reminder_time = booking.session_time - timedelta(hours=1)
    while datetime.now() < reminder_time:
        pass  # Placeholder for actual waiting logic
    print(f"Reminder: Upcoming {booking.type} at {booking.session_time} for user {booking.user_id}")

# ============================
# Ratings and Reviews
# ============================

class Review(BaseModel):
    id: str
    reviewer_id: str
    reviewee_id: str
    rating: int  # 1-5
    comments: Optional[str] = None

reviews_db = {}

@app.post("/reviews/")
def create_review(review: Review):
    review.id = str(uuid.uuid4())
    reviews_db[review.id] = review
    return {"message": "Review submitted successfully", "review": review}

@app.get("/reviews/{reviewee_id}")
def get_reviews(reviewee_id: str):
    review_list = [review for review in reviews_db.values() if review.reviewee_id == reviewee_id]
    if not review_list:
        raise HTTPException(status_code=404, detail="No reviews found")
    return review_list

# ============================
# Search and Filters
# ============================

@app.get("/search/")
def search_users(role: str, skill_level: Optional[str] = None):
    results = [
        user for user in users_db.values()
        if user.role == role and (not skill_level or user.skill_level == skill_level)
    ]
    return results
