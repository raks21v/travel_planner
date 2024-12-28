CREATE TABLE places (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    category TEXT,
    rating REAL,
    entry_fee REAL,
    best_time_to_visit TEXT
);