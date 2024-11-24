build:
	@chmod +x deploy.sh
	@./deploy.sh

start:
	@cd ./server && npm run start

watch:
	@echo "Starting server and frontend in parallel..."
	@cd ./server && npm run start:dev & \
	cd ./front && npm run dev
