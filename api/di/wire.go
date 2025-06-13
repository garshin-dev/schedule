package di

import (
	"api/handler"
	"api/repository"
	"api/service"
	"database/sql"
)

type Dependencies struct {
	UserHandler *handler.UserHandler
	TagHandler  *handler.TagHandler
}

func InitDependencies(db *sql.DB) (*Dependencies, error) {
	userRepo := repository.NewUserRepository(db)
	userService := service.NewUserService(userRepo)
	userHandler := handler.NewUserHandler(userService)

	tagRepo := repository.NewTagRepository(db)
	tagService := service.NewTagService(tagRepo)
	tagHandler := handler.NewTagHandler(tagService)

	return &Dependencies{
		UserHandler: userHandler,
		TagHandler:  tagHandler,
	}, nil
}
