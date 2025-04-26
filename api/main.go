package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func main() {
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_CONTAINER_NAME")
	dbName := os.Getenv("DB_NAME")
	PORT := os.Getenv("BACKEND_PORT")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=disable", dbHost, dbUser, dbPassword, dbName)
	db, err := sql.Open("postgres", dsn)

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	router := mux.NewRouter().PathPrefix("/api").Subrouter()
	router.HandleFunc("/users", getUsers(db)).Methods("GET")
	router.HandleFunc("/users/{id}", getUser(db)).Methods("GET")
	// router.HandleFunc("/users", createUser(db)).Methods("POST")
	// router.HandleFunc("/users/{id}", updateUser(db)).Methods("PUT")
  // router.HandleFunc("/users/{id}", deleteUser(db)).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":"+PORT, corsMiddleware(router)))
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func getUsers(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query("SELECT id, name, email FROM users")

		if err != nil {
			log.Fatal(err)
		}

		defer rows.Close()

		users := []User{}

		for rows.Next() {
			var user User

			if err := rows.Scan(&user.ID, &user.Name, &user.Email); err != nil {
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

func getUser(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        params := mux.Vars(r)

        id := params["id"]

        row := db.QueryRow("SELECT id, name, email FROM users WHERE id=$1", id)

        var user User

        if err := row.Scan(&user.ID, &user.Name, &user.Email); err!= nil {
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