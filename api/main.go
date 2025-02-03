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

	router := mux.NewRouter()
	router.HandleFunc("/users", getUsers(db)).Methods("GET")
	// router.HandleFunc("/users/${id}", getUsers(db)).Methods("GET")
	// router.HandleFunc("/users", getUsers(db)).Methods("POST")
	// router.HandleFunc("/users/{id}", getUsers(db)).Methods("PUT")
	// router.HandleFunc("/users/{id}", getUsers(db)).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":"+PORT, jsonContentTypeMiddleware(router)))
}

func jsonContentTypeMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}

func getUsers(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query("SELECT * FROM users")

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
