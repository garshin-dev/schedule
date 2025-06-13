package routes

import (
	"api/di"
	"github.com/gorilla/mux"
)

func SetupUserRouters(router *mux.Router, deps *di.Dependencies) {
	router.HandleFunc("/users", deps.UserHandler.GetUsers).Methods("GET")

	//router.HandleFunc("/users/{id}", getUser(database)).Methods("GET")
	//router.HandleFunc("/users", createUser(db)).Methods("POST")
	//router.HandleFunc("/users/{id}", updateUser(db)).Methods("PUT")
	//router.HandleFunc("/users/{id}", deleteUser(db)).Methods("DELETE")
}
