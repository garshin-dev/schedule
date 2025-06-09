FROM golang:1.24-alpine

WORKDIR /app

RUN go install github.com/air-verse/air@v1.62.0

COPY go.* ./
RUN go mod download

COPY . .

CMD ["air", "-c", ".air.toml"]