package handlers

import (
	"database/sql"
	"encoding/json"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"time"
)

type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
}

func GetUsers(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query("SELECT id, name, email, created_at FROM users")

		if err != nil {
			log.Fatal(err)
		}

		defer rows.Close()

		users := []User{}

		for rows.Next() {
			var user User

			if err := rows.Scan(&user.ID, &user.Name, &user.Email, &user.CreatedAt); err != nil {
				log.Fatal(err)
			}

			users = append(users, user)
		}

		if err := rows.Err(); err != nil {
			log.Fatal(err)
		}

		json.NewEncoder(w).Encode(users)
	}
}

func GetUser(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)

		id := params["id"]

		row := db.QueryRow("SELECT id, name, email, created_at FROM users WHERE id=$1", id)

		var user User

		if err := row.Scan(&user.ID, &user.Name, &user.Email, &user.CreatedAt); err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "User not found", http.StatusNotFound)
				return
			} else {
				log.Fatal(err)
			}
		}

		json.NewEncoder(w).Encode(user)
	}
}
