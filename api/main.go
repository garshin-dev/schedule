package main

import (
	"api/db"
	"api/handlers"
	"api/middleware"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
}

func main() {
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_CONTAINER_NAME")
	dbName := os.Getenv("DB_NAME")
	PORT := os.Getenv("BACKEND_PORT")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=disable", dbHost, dbUser, dbPassword, dbName)

	database, err := db.Connect(dsn)

	if err != nil {
		log.Fatal(err)
	}

	defer database.Close()

	router := mux.NewRouter().PathPrefix("/api").Subrouter()
	router.HandleFunc("/users", handlers.GetUsers(database)).Methods("GET")
	router.HandleFunc("/users/{id}", handlers.GetUser(database)).Methods("GET")
	//router.HandleFunc("/users", createUser(db)).Methods("POST")
	//router.HandleFunc("/users/{id}", updateUser(db)).Methods("PUT")
	//router.HandleFunc("/users/{id}", deleteUser(db)).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":"+PORT, middleware.CorsMiddleware(router)))
}
