package main

import (
	"api/db"
	"api/di"
	"api/middleware"
	"api/routes"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"
)

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

	deps, err := di.InitDependencies(database)

	if err != nil {
		log.Fatalf("Failed to initialize dependencies: %v", err)
	}

	router := routes.SetupRouter(deps)

	log.Fatal(http.ListenAndServe(":"+PORT, middleware.CorsMiddleware(router)))
}
